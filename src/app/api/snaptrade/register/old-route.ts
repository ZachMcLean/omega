import { Snaptrade } from "snaptrade-typescript-sdk";

const client = new Snaptrade({
  clientId: "LOGOS-TEST-GUZDW",
  consumerKey:
    "AXiJlQRZcHHpvrFRtft3UWAmvdrLoKopgqwuix00dCd2U0RcKY",
});

const response =
  await client.authentication.loginSnapTradeUser(
    {
      userId: "zach-72",
      userSecret:
        "96ab2105-ce70-4c45-af78-7ac84df7df89",
      broker: "ROBINHOOD",
      connectionType: "read",
      connectionPortalVersion: "v4",
    },
  );
console.log(response.data);
