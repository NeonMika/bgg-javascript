import * as d3 from "d3";
import { xml2js } from "xml-js";
import { User } from "./User.js";
import { Play, Plays } from "./Plays.js";

export default class BGG {
  static userURL(username: string): string {
    return `https://boardgamegeek.com/xmlapi2/user?name=${username}&buddies=1&guilds=1&hot=1&top=1`
  }

  static async userXMLString(username: string): Promise<string> {
    return await d3.text(BGG.userURL(username))
  }

  static async user(username: string): Promise<User> {
    return new User((xml2js(await BGG.userXMLString(username), { compact: true }) as any).user);
  }

  static playsURL(username: string, page: number = 1) {
    return `https://boardgamegeek.com/xmlapi2/plays?username=${username}&page=${page}`
  }

  static async playsXMLString(username: string, page: number = 1): Promise<string> {
    return await d3.text(BGG.playsURL(username, page))
  }

  static async plays(username: string, page: number = 1): Promise<Plays> {
    return new Plays((xml2js(await BGG.playsXMLString(username, page), { compact: true }) as any).plays);
  }

  static async allPlays(
    username: string,
    notifyFn: (page: number, event: string) => void = (page, event) => { console.log(page, event) }
  ): Promise<Plays> {
    let plays: Play[] = []
    let page = 1;

    let playsPage: Plays | null = null
    let success: boolean = false
    while (!success || playsPage == null || playsPage.plays?.length > 0) {
      success = true
      try {
        notifyFn(page, "start")
        playsPage = await BGG.plays(username, page);
        notifyFn(page, "end")
        plays.push(...playsPage.plays);
        page++;
      } catch (e) {
        success = false
      }
    }
    plays.sort((a, b) => d3.ascending(a._date, b._date))
    playsPage.plays = plays
    return playsPage
  }
}