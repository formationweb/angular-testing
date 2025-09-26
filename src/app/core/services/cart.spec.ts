import { firstValueFrom, lastValueFrom } from 'rxjs';
import { CartItem, CartService } from "./cart"

describe('Cart Service', () => {
    let service: CartService

    beforeEach(() => {
        service = new CartService()
    })

    it('vérifier que items$ émet [] dès l’abonnement.', async () => {
        const result = await firstValueFrom(service.items$)
        expect(result.length).toBe(0)
    })

    it('Ajout d’un article : après addItem(item1), items$ émet [{item1}].', async () => {
        service.addItem({
            id: 1,
            price: 10,
            name: 'ordi'
        })
        const result = await firstValueFrom(service.items$)
        expect(result.length).toBe(1)
        expect(result[0].id).toBe(1)
    })

    it('Clear : après avoir ajouté au moins un article, clear() remet items$ à [].', () => {
        const array: CartItem[][] = []

        service.items$.subscribe((item) => {
            array.push(item)
        })

        let mockItem = {
            id: 1,
            price: 10,
            name: 'ordi'
        }

        service.addItem(mockItem)

        service.clear()

        expect(array.length).toBe(3)
        expect(array[2]).toEqual([])
    })
})