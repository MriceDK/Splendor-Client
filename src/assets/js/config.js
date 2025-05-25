const GROUPNUMBER = "11";
const GROUPTOKEN = "Group11-6470-184";

const ERRORHANDLERSELECTOR = ".errormessages p";

const LOCALSERVER = `http://localhost:8080`;
const DEPLOYEDSERVER = `https://project-1.ti.howest.be/2024-2025/splendor/api`;
const GROUPDEPLOYEDSERVER = `https://project-1.ti.howest.be/2024-2025/group-${GROUPNUMBER}/api`;

function getAPIUrl() {
  return GROUPDEPLOYEDSERVER;
}

export { getAPIUrl, GROUPTOKEN, ERRORHANDLERSELECTOR };
