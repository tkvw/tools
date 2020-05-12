declare module "nps-utils" {
  type nps = (...scripts: string[]) => string;

  export const concurrent: { nps: nps };
  export const series: { nps: nps };
  export function rimraf(args: string): string;
}
