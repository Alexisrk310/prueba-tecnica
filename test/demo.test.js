describe('DemoJS', () => {
    test('Comparar variables', () => {
        const name = "Miguel"
        const nametwo = name.slice(0, 4) + "el"
        expect(name).toBe(nametwo)
    })
    test('Test object', () => {
        const name = "Miguel"
        const obj = (name) => ({ name, id: 10 })

        expect(obj(name)).toEqual({ name, id: 10 })
    })
    test('Test Array', () => {
        const name = "Miguel"
        const array = [{ name, id: 12 }, "Hola"]

        expect(array[0].name).toBe("Miguel")
        expect(false).toBe(false)

    })
    test('Test Boolean', () => {
        expect(false).toBe(false)
    })
    test('Test Heroes filter', () => {
        const heroes = [
            {
                id: 1,
                name: 'Batman',
                owner: 'DC'
            },
            {
                id: 2,
                name: 'Spiderman',
                owner: 'Marvel'
            },
            {
                id: 3,
                name: 'Superman',
                owner: 'DC'
            },
            {
                id: 4,
                name: 'Flash',
                owner: 'DC'
            },
            {
                id: 5,
                name: 'Wolverine',
                owner: 'Marvel'
            },
        ];
        const owner = "DC"
        const heroesMarvelFilter = heroes.filter(hero => hero.owner === owner)
        console.log(heroes[0].owner);
        expect(heroesMarvelFilter.length).toBe(3)
    })
})

test('Test task async', () => {

})