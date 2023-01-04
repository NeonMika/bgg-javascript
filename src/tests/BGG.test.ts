import { expect } from "chai";
import BGG, { UserOptions } from "../main/BGG.js";
import { Plays } from "../main/Plays.js";
import { User } from "../main/User.js";

describe("The correct URL is returned for", () => {
  it("the user with default options", () => {
    expect(BGG.userURL("test")).to.equal("https://boardgamegeek.com/xmlapi2/user?name=test&buddies=0&guilds=0&hot=0&top=0");
  });
  it("the user with full options (via .full())", () => {
    expect(BGG.userURL("test", UserOptions.full())).to.equal("https://boardgamegeek.com/xmlapi2/user?name=test&buddies=1&guilds=1&hot=1&top=1");
  });
  it("the user with minimal options (via constructor)", () => {
    expect(BGG.userURL("test", new UserOptions())).to.equal("https://boardgamegeek.com/xmlapi2/user?name=test&buddies=0&guilds=0&hot=0&top=0");
  });
  it("the user with minimal options (via .default())", () => {
    expect(BGG.userURL("test", UserOptions.default())).to.equal("https://boardgamegeek.com/xmlapi2/user?name=test&buddies=0&guilds=0&hot=0&top=0");
  });
  it("the user with minimal options (via .minimal())", () => {
    expect(BGG.userURL("test", UserOptions.minimal())).to.equal("https://boardgamegeek.com/xmlapi2/user?name=test&buddies=0&guilds=0&hot=0&top=0");
  });
  it("the user with buddies (using boolean)", () => {
    expect(BGG.userURL("test", {
      buddies: true
    })).to.equal("https://boardgamegeek.com/xmlapi2/user?name=test&buddies=1&guilds=0&hot=0&top=0");
  });
  it("the user with buddies (using number)", () => {
    expect(BGG.userURL("test", {
      buddies: 1
    })).to.equal("https://boardgamegeek.com/xmlapi2/user?name=test&buddies=1&guilds=0&hot=0&top=0");
  });
  it("the first page of plays (via playsURL)", () => {
    expect(BGG.playsURL("test", 1)).to.equal("https://boardgamegeek.com/xmlapi2/plays?username=test&page=1")
  });
  it("the seconds page of plays (via playsURL)", () => {
    expect(BGG.playsURL("test", 2)).to.equal("https://boardgamegeek.com/xmlapi2/plays?username=test&page=2")
  });
});

describe("The full user 'test'", () => {
  let testUser: User;
  let testPlays: Plays;
  before(async () => {
    testUser = await BGG.user("test", UserOptions.full());
    testPlays = await BGG.allPlays("test", () => { })
  });
  it("is not null", async () => {
    expect(testUser).to.not.be.null;
  });
  it("has correct values", async () => {
    expect(testUser.avatarlink.v).to.equal("N/A");
    expect(testUser.battlenetaccount.v).to.equal("{${sleep(20)}}");
    expect(testUser.buddies).to.have.length(0);
    expect(testUser.country.v).to.equal("United States");
    expect(testUser.firstname.v).to.equal("eva");
    expect(testUser.guilds).to.have.length(0);
    expect(testUser.hot).to.have.length(10);
    expect(testUser.lastlogin.v).to.equal("2019-12-30");
    expect(testUser.lastname.v).to.equal("testla");
    expect(testUser.psnaccount.v).to.equal("");
    expect(testUser.stateorprovince.v).to.equal("Unspecified");
    expect(testUser.steamaccount.v).to.equal("");
    expect(testUser.top).to.have.length(10);
    expect(testUser.traderating.v).to.equal("0");
    expect(testUser.webaddress.v).to.equal("");
    expect(testUser.wiiaccount.v).to.equal("");
    expect(testUser.xboxaccount.v).to.equal("");
    expect(testUser.yearregistered.v).to.equal("2003");
  });
  it("has zero plays", async () => {
    expect(testPlays.plays).to.have.length(0);
  });
});

describe("The minimal user 'test'", () => {
  let testUser: User;
  before(async () => {
    testUser = await BGG.user("test");
  });
  it("is not null", async () => {
    expect(testUser).to.not.be.null;
  });
  it("has empty buddies, guilds, hot and top", async () => {
    expect(testUser.buddies).to.have.length(0);
    expect(testUser.guilds).to.have.length(0);
    expect(testUser.hot).to.have.length(0);
    expect(testUser.hot).to.have.length(0);
  });
});

describe("The full user 'neonmika'", function () {
  this.timeout(15000);

  let neonmikaUser: User;
  let neonmikaPlays: Plays;
  before(async () => {
    neonmikaUser = await BGG.user("neonmika", UserOptions.full());
    neonmikaPlays = await BGG.allPlays("neonmika", () => { });
  });
  it("is not null", async () => {
    expect(neonmikaUser).to.not.be.null;
  });
  it("has correct values", async () => {
    expect(neonmikaUser.avatarlink.v).to.equal("https://cf.geekdo-static.com/avatars/avatar_id169766.jpg");
    expect(neonmikaUser.battlenetaccount.v).to.equal("");
    expect(neonmikaUser.buddies.length).to.be.greaterThan(0);
    expect(neonmikaUser.country.v).to.equal("Austria");
    expect(neonmikaUser.firstname.v).to.equal("Markus");
    expect(neonmikaUser.guilds.length).to.be.greaterThan(0);
    expect(neonmikaUser.hot).to.have.length(0);
    // expect(testUser.lastlogin.v).to.equal("????");
    expect(neonmikaUser.lastname.v).to.equal("Weninger");
    expect(neonmikaUser.psnaccount.v).to.equal("");
    expect(neonmikaUser.stateorprovince.v).to.equal("Upper Austria");
    expect(neonmikaUser.steamaccount.v).to.equal("neomika");
    expect(neonmikaUser.top).to.have.length(0);
    expect(neonmikaUser.traderating.v).to.equal("0");
    expect(neonmikaUser.webaddress.v).to.equal("");
    expect(neonmikaUser.wiiaccount.v).to.equal("");
    expect(neonmikaUser.xboxaccount.v).to.equal("");
    expect(neonmikaUser.yearregistered.v).to.equal("2016");
  });
  it("has more than 1600 plays", async () => {
    expect(neonmikaPlays.plays.length).to.be.greaterThan(1600);
  });
  it("has Inis as first play on 2018-01-03 with players 'Birgit, Magda, Markus, Markus G.'", async () => {
    expect(neonmikaPlays.plays[0]._itemName).to.equal("Inis");
    expect(neonmikaPlays.plays[0].dateAttribute).to.equal("2018-01-03");
    expect(neonmikaPlays.plays[0]._players).to.equal("Birgit, Magda, Markus, Markus G.");
  });
});

describe("The minimal user 'neonmika'", function () {
  this.timeout(15000);

  let neonmikaUser: User;
  before(async () => {
    neonmikaUser = await BGG.user("neonmika");
  });
  it("is not null", async () => {
    expect(neonmikaUser).to.not.be.null;
  });
  it("has empty buddies, guilds, hot and top", async () => {
    expect(neonmikaUser.buddies).to.have.length(0);
    expect(neonmikaUser.guilds).to.have.length(0);
    expect(neonmikaUser.hot).to.have.length(0);
    expect(neonmikaUser.hot).to.have.length(0);
  });
});
