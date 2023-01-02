import { Attributes, ElementCompact } from 'xml-js'
import { ElementWithValue } from './xml/ElementWithValue.js'

export class SubType extends ElementWithValue { }

export class Item {
  _attributes?: Attributes

  subtypes: SubType[]

  constructor(item: ElementCompact) {
    this._attributes = item._attributes
    this.subtypes = item.subtypes?.subtype ? [].concat(item.subtypes.subtype).map((subtype: ElementCompact) => new SubType(subtype)) : []
  }

  get nameAttribute(): string { return this._attributes?.name?.toString() ?? "" }
  get objecttypeAttribute(): string { return this._attributes?.objecttype?.toString() ?? "" }
  get objectidAttribute(): string { return this._attributes?.objectid?.toString() ?? "" }
}

export class Player {
  _attributes?: Attributes

  constructor(player: ElementCompact) {
    Object.assign(this, player)
  }

  get usernameAttribute(): string { return this._attributes?.username?.toString() ?? "" }
  get useridAttribute(): string { return this._attributes?.userid?.toString() ?? "" }
  get nameAttribute(): string { return this._attributes?.name?.toString() ?? "" }
  get startpositionAttribute(): string { return this._attributes?.startposition?.toString() ?? "" }
  get colorAttribute(): string { return this._attributes?.color?.toString() ?? "" }
  get newAttribute(): string { return this._attributes?.new?.toString() ?? "" }
  get ratingAttribute(): string { return this._attributes?.rating?.toString() ?? "" }
  get scoreAttribute(): string { return this._attributes?.score?.toString() ?? "" }
  get winAttribute(): string { return this._attributes?.win?.toString() ?? "" }

}

export class Play {
  _attributes?: Attributes

  item: Item
  players: Player[]
  comments: string

  constructor(play: ElementCompact) {
    this._attributes = play._attributes
    this.item = new Item(play.item)
    this.players = play.players?.player ? [].concat(play.players.player).map((player: ElementCompact) => new Player(player)) : []
    this.comments = play.comments?._text?.toString() ?? ""
  }

  get dateAttribute(): string { return this._attributes?.date?.toString() ?? "" }
  get idAttribute(): string { return this._attributes?.id?.toString() ?? "" }
  get incompleteAttribute(): string { return this._attributes?.incomplete?.toString() ?? "" }
  get lengthAttribute(): string { return this._attributes?.length?.toString() ?? "" }
  get locationAttribute(): string { return this._attributes?.location?.toString() ?? "" }
  get nowinstatsAttribute(): string { return this._attributes?.nowinstats?.toString() ?? "" }
  get quantityAttribute(): string { return this._attributes?.quantity?.toString() ?? "" }

  get _date(): Date { return new Date(this.dateAttribute) }
  get _itemName(): string { return this.item.nameAttribute }
  get _players(): string { return this.players.map(p => p.nameAttribute).sort().join(", ") }
}

export class Plays implements ElementCompact {
  _attributes?: Attributes

  plays: Play[] = []

  constructor(plays: ElementCompact = {}) {
    this._attributes = plays._attributes
    this.plays = plays.play ? [].concat(plays.play).map((x: any) => new Play(x)) : []
  }

  get totalAttribute(): string { return this._attributes?.total?.toString() ?? "" }
  get useridAttribute(): string { return this._attributes?.userid?.toString() ?? "" }
  get usernameAttribute(): string { return this._attributes?.username?.toString() ?? "" }
}