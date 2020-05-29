import VetproviehList from "../lib/vetprovieh-list";

test('should init src', () => {
    let list = new VetproviehList();
    list.src = "test";
    expect(list.src).toBe("test");
})