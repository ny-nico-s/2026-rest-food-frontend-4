/**
 * Ein Gericht auf der Speisekarte (Backend-Entität "Menu" / "MenuItem").
 * Felder laut PDF: id, name, description, price, category, imageUrl, ChefsChoice.
 */
export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  chefsChoice: boolean
}

/**
 * Daten zum Anlegen/Bearbeiten eines Gerichts.
 * Wie MenuItem, aber ohne id (die vergibt das Backend).
 */
export type MenuItemInput = Omit<MenuItem, 'id'>
