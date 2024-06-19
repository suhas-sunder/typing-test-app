import mockAccountAPI from "./mockAccountAPI";
import mockCloudflareR2API from "./mockCloudflareR2API";
import mockImageAPI from "./mockImageAPI";
import mockScoreAPI from "./mockScoreAPI";
import mockSettingsAPI from "./mockSettingsAPI";
import mockUserAPI from "./mockUserAPI";

function mockAllAPI() {
  mockAccountAPI({});
  mockCloudflareR2API({});
  mockImageAPI({});
  mockScoreAPI({});
  mockSettingsAPI({});
  mockUserAPI({});
}

export default mockAllAPI;
