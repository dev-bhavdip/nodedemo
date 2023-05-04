// Starting November 30, 2022, API keys will be sunset as an authentication method. Learn more about this change: https://developers.hubspot.com/changelog/upcoming-api-key-sunset and how to migrate an API key integration: https://developers.hubspot.com/docs/api/migrate-an-api-key-integration-to-a-private-app to use a private app instead.
const hubspot = require("@hubspot/api-client");

const hubspotClient = new hubspot.Client({
  accessToken: "pat-na1-808fc73f-839e-42d2-8554-1ab46e8379af",
});

const limit = 10;
const after = undefined;
const properties = undefined;
const propertiesWithHistory = undefined;
const associations = undefined;
const archived = false;

try {
  async function abc() {
    const apiResponse = await hubspotClient.crm.companies.basicApi.getPage(
      limit,
      after,
      properties,
      propertiesWithHistory,
      associations,
      archived
    );
    console.log(JSON.stringify(apiResponse, null, 2));
  }
  abc();
} catch (e) {
  e.message === "HTTP request failed"
    ? console.error(JSON.stringify(e.response, null, 2))
    : console.error(e);
}

// const hubspot = require("@hubspot/api-client");

const properties1 = {
  city: "Cambridge",
  domain: "biglytics.net",
  industry: "Technology",
  name: "Biglytics",
  phone: "(+91) 929-0687",
  state: "Massachusetts",
};
const SimplePublicObjectInputForCreate = {
  properties1,
  associations: [
    {
      to: { id: "101" },
      types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 2 }],
    },
  ],
};

try {
  async function demo() {
    const apiResponse = await hubspotClient.crm.companies.basicApi.create(
      SimplePublicObjectInputForCreate
    );
    // console.log(JSON.stringify(apiResponse, null, 2));
  }
  demo();
} catch (e) {
  e.message === "HTTP request failed"
    ? console.error(JSON.stringify(e.response, null, 2))
    : console.error(e);
}

