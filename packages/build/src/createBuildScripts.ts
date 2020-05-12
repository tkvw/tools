import * as npsUtil from "nps-utils";

export interface BuildEnv {
  npmClient: "yarn" | "npm";
  addDependencies(...dependencies: string[]): void;
  addDevDependencies(...dependencies: string[]): void;
}
export interface ScriptDetail {
  script: string;
  description?: string;
  hiddenFromHelp?: boolean;
}
export interface Script {
  default?: string | ScriptDetail;
  [id: string]: Script | string | ScriptDetail;
}
export interface Scripts {
  scripts: Script;
}

export function createBuildScripts(script: Script): Scripts;
export function createBuildScripts(
  cb: (npu: typeof npsUtil) => Script
): Scripts;
export function createBuildScripts(scriptOrCallback: any) {
  const script =
    typeof scriptOrCallback === "function"
      ? scriptOrCallback(npsUtil)
      : scriptOrCallback;

  return {
    scripts: script,
  };
}
