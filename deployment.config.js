const target = process.env.TARGET || "dev";

let baseURL = "https://pmis-apidev.wisdomcloud.net/api/v1"; // DEV
let siteURL = "https://pmis-apidev.wisdomcloud.net";
let versionDEV = "1.0.0";
let versionSTG = "1.0.0";
let versionUAT = "1.0.0";
let version = "";

switch (target) {
   case "dev":
      baseURL = "https://pmis-apidev.wisdomcloud.net/api/v1"; // DEV
      version = "DEV: " + versionDEV;
      siteURL = "/";
      break;
   case "stg":
      baseURL = "https://pmis-apistg.wisdomcloud.net/api/v1"; // STG
      version = "STG: " + versionSTG;
      siteURL = "/";
      break;
   case "prd":
      baseURL = ""; // PROD
      version = "PROD: " + versionUAT;
      siteURL = "/";
      break;
   case "uat":
      baseURL = "https://pmis-apiuat.wisdomcloud.net/api/v1"; // UAT
      version = "UAT: " + versionUAT;
      siteURL = "";
      break;
   default:
      break;
}

export default {
   baseURL: baseURL,
   version: `(${version})`,
   target: target,
};