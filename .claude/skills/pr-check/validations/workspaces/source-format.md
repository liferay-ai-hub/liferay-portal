# Workspace Source Format

## Match

`.`

## Command

Check the frontend files first. `formatSource` checks no frontend file, but CI's `ci:test:sf` also runs `node-scripts format --check --current-branch` from `modules`, which applies Prettier and then ESLint to every changed frontend file, workspace files included. In `liferay-portal`, **Source Format** runs that check, but in `liferay-portal-ee` nothing else in this skill does, so a branch with a TypeScript line that Prettier would wrap passes here and fails CI. List the changed frontend files of the workspace, install its Node packages, and run its own Prettier and ESLint on them:

```bash
cd "${BUILD_ROOT}"

mapfile -t ESLINT_FILES < <(git diff --diff-filter=d --name-only --no-renames --relative "${MERGE_BASE}...HEAD" -- '*.js' '*.mjs' '*.ts' '*.tsx')
mapfile -t PRETTIER_FILES < <(git diff --diff-filter=d --name-only --no-renames --relative "${MERGE_BASE}...HEAD" -- '*.graphql' '*.js' '*.mjs' '*.scss' '*.ts' '*.tsx')

if (( ${#PRETTIER_FILES[@]} ))
then
	./gradlew yarnInstall

	git checkout -- package.json

	export PATH="${BUILD_ROOT}/build/node/bin:${PATH}"

	node_modules/.bin/prettier --write "${PRETTIER_FILES[@]}"

	if (( ${#ESLINT_FILES[@]} ))
	then
		node_modules/.bin/eslint --fix --max-warnings 0 "${ESLINT_FILES[@]}"
	fi
fi
```

The extensions are the ones `node-scripts` formats, without `jsp` and `jspf`, whose script tags only `node-scripts` can reach. `--diff-filter=d` leaves out deleted files, which neither tool can open. `--max-warnings 0` fails the run on a warning, because `node-scripts` fails a file on any ESLint message.

Run this before `formatSource`, while the working tree is still clean. `yarnInstall` rewrites the tracked `package.json` when it sorts the `workspaces` list in it, and restoring the file at this point cannot discard a repair of the formatter. Prettier, ESLint, and their configuration are the workspace's own, at the versions its root `package.json` pins. A workspace that declares neither has no `node_modules/.bin/prettier`, so report the step as not applicable for it and go on.

Prettier rewrites in place every file it would fail, and ESLint fixes what it can, so the autocommit records both repairs. An ESLint error or warning that remains is a finding; quote its file, line, and rule.

ESLint exits with 2 when it crashes rather than reports. Workspaces pin ESLint 7.32.0, and their lockfiles resolve `eslint-plugin-sort-destructure-keys` to 1.6.0, which calls the `getScope` of ESLint 8 and crashes on the first destructured object. When the stack trace points at one rule, rerun ESLint with that rule turned off, such as `--rule 'sort-destructure-keys/sort-destructure-keys: off'`, and name the rule in the result as one this run did not check.

This covers the source file check of `node-scripts` only. Its TypeScript, Stylelint, and `package.json` checks still run in CI alone.

Then run the workspace's own source formatter in current branch mode against `${BASE_BRANCH}`:

```bash
cd "${BUILD_ROOT}"

./gradlew \
	--system-prop formatSource.format.current.branch=true \
	--system-prop "formatSource.git.working.branch.name=${BASE_BRANCH}" \
	--system-prop "formatSource.source.base.dir=${BUILD_ROOT}" \
	formatSource
```

The formatter comes from the workspace's own plugins, so its version is the one the workspace pins. The properties are JVM system properties, so pass them with `--system-prop`. The plugin ignores a Gradle project property without an error and then formats the whole workspace.

Pass `source.base.dir` as an absolute path. From a relative one, the formatter miscounts the depth of the workspace below the repository root by one level, and then either drops changed files silently or fails with a `NullPointerException`.

Current branch mode also reads every file the branch changed across the whole repository and strips from each path as many leading directories as the workspace is deep, without checking that the path belongs to the workspace. A changed file outside the workspace that sits two or more directories deep, such as `.claude/skills/pr-check/SKILL.md`, becomes a path inside the workspace. That path usually does not exist, and the formatter fails with a `NullPointerException` in `BaseSourceProcessor.hasGeneratedTag`. When the branch changes such a file, report **NOT VERIFIED** and name the file, since the formatter checked nothing.

A nonzero exit is a finding. Read the violations from the middle of the log, because the terminal Gradle error names the failing task and not the reason for it.

## Autocommit

When `git status --porcelain` is nonempty after the formatters, stage the tracked modifications with `git add --update` and create a commit titled `<TICKET> SF`.

Use `--update` rather than `--all`, since a workspace accumulates `bundles`, `build`, and `node_modules` during a run and `--all` would sweep them in.

## Time Estimate

~1 min, and longer the first time `yarnInstall` installs the workspace's Node packages.