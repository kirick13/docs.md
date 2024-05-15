
# Navigation

Navigation is a element located on the right that contains "navigation blocks" with links.

## Navigation block

Navigation block is a main element of the navigation. It contains a title and a list of items.

<!-- DOCS.MD: PARAMETERS -->
|- title: string
|  Title of the block.
|- items: array
|  List of items in the block.

## Navigation item

Navigation item is a link or/and a header of the subitems list.

<!-- DOCS.MD: PARAMETERS -->
|- title: string
|  Title of the item.
|- url: string?
|  URL of the item.
|  If provided, the item will be a link.
|  If not, the item will be a header of the subitems list and will open the subitems list when clicked.
|- items: array?
|  List of subitems.

## Navigation subitem

Subitems are located under the item in the navigation. List of subitems is visible by default only if there is a subitem with the same URL as the current page.

<!-- DOCS.MD: PARAMETERS -->
|- title: string
|  Title of the subitem.
|- url: string
|  URL of the subitem.
