export class Slider<T> {
  private items: T[]
  private container: HTMLElement
  private renderItem: (item: T) => HTMLElement
  private index: number = 0
  private visibleItems: number

  constructor(
    items: T[],
    container: HTMLElement,
    renderItem: (item: T) => HTMLElement,
    visibleItems: number
  ) {
    this.items = items
    this.container = container
    this.renderItem = renderItem
    this.visibleItems = visibleItems

    this.render()
  }

  private render(): void {
    this.container.innerHTML = ""

    for (let i = 0; i < this.visibleItems; i++) {
      const itemIndex = (this.index + i) % this.items.length
      const element = this.renderItem(this.items[itemIndex])
      this.container.appendChild(element)
    }
  }

  public next(): void {
    this.index = (this.index + 1) % this.items.length
    this.render()
  }

  public prev(): void {
    this.index = (this.index - 1 + this.items.length) % this.items.length
    this.render()
  }
}
