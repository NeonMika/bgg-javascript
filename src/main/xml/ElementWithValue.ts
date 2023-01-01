import { Attributes, ElementCompact } from "xml-js"

export class ElementWithValue implements ElementCompact {
  _attributes?: Attributes

  constructor(element: ElementCompact) {
    Object.assign(this, element)
  }
  get valueAttribute(): string { return this._attributes?.value?.toString() ?? "" }
  get v(): string { return this.valueAttribute }
}