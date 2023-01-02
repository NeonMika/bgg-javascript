import { Attributes, ElementCompact } from 'xml-js'
import { ElementWithValue } from './xml/ElementWithValue.js'

export class AvatarLink extends ElementWithValue { }
export class BattlenetAccount extends ElementWithValue { }

export class Buddy implements ElementCompact {
  _attributes?: Attributes

  constructor(buddy: ElementCompact) {
    Object.assign(this, buddy)
  }
  get idAttribute(): string { return this._attributes?.id?.toString() ?? "" }
  get nameAttribute(): string { return this._attributes?.name?.toString() ?? "" }
}

export class Country extends ElementWithValue { }
export class FirstName extends ElementWithValue { }

export class Guild implements ElementCompact {
  _attributes?: Attributes

  get idAttribute(): string { return this._attributes?.id?.toString() ?? "" }
  get nameAttribute(): string { return this._attributes?.name?.toString() ?? "" }

  constructor(guild: ElementCompact) {
    Object.assign(this, guild)
  }
}

export class HotItem implements ElementCompact {
  _attributes?: Attributes

  constructor(hotItem: ElementCompact) {
    Object.assign(this, hotItem)
  }
  get rankAttribute(): string { return this._attributes?.rank?.toString() ?? "" }
  get typeAttribute(): string { return this._attributes?.type?.toString() ?? "" }
  get idAttribute(): string { return this._attributes?.id?.toString() ?? "" }
  get nameAttribute(): string { return this._attributes?.name?.toString() ?? "" }
}

export class LastLogin extends ElementWithValue { }
export class LastName extends ElementWithValue { }
export class PSNAccount extends ElementWithValue { }
export class StateOrProvince extends ElementWithValue { }
export class SteamAccount extends ElementWithValue { }
export class TradeRating extends ElementWithValue { }
export class WebAddress extends ElementWithValue { }
export class WiiAccount extends ElementWithValue { }
export class XBoxAccount extends ElementWithValue { }
export class YearRegistered extends ElementWithValue { }

export class User implements ElementCompact {
  _attributes?: Attributes

  avatarlink: AvatarLink
  battlenetaccount: BattlenetAccount
  buddies: Buddy[]
  country: Country
  firstname: FirstName
  guilds: Guild[]
  hot: HotItem[]
  lastlogin: LastLogin
  lastname: LastName
  psnaccount: PSNAccount
  stateorprovince: StateOrProvince
  steamaccount: SteamAccount
  traderating: TradeRating
  webaddress: WebAddress
  wiiaccount: WiiAccount
  xboxaccount: XBoxAccount
  yearregistered: YearRegistered

  constructor(user: ElementCompact) {
    this._attributes = user._attributes

    this.avatarlink = new AvatarLink(user.avatarlink)
    this.battlenetaccount = new BattlenetAccount(user.battlenetaccount)
    this.buddies = user.buddies?.buddy ? [].concat(user.buddies.buddy).map((b: any) => new Buddy(b)) : []
    this.country = new Country(user.country)
    this.firstname = new FirstName(user.firstname)
    this.guilds = user.guilds?.guild ? [].concat(user.guilds.guild).map((g: any) => new Guild(g)) : []
    this.hot = user.hot?.item ? [].concat(user.hot.item).map((h: any) => new HotItem(h)) : []
    this.lastlogin = new LastLogin(user.lastlogin)
    this.lastname = new LastName(user.lastname)
    this.psnaccount = new PSNAccount(user.psnaccount)
    this.stateorprovince = new StateOrProvince(user.stateorprovince)
    this.steamaccount = new SteamAccount(user.steamaccount)
    this.traderating = new TradeRating(user.traderating)
    this.webaddress = new WebAddress(user.webaddress)
    this.wiiaccount = new WiiAccount(user.wiiaccount)
    this.xboxaccount = new XBoxAccount(user.xboxaccount)
    this.yearregistered = new YearRegistered(user.yearregistered)
  }
}