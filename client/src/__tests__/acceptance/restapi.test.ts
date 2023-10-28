import app from '../../app';

it('Simple Test', () => {
    expect(1 + 1).toBe(2);
});

it('WS Call', async () => {
    const req = await app.get("/expenses");
    console.log(req);
    expect(req).toBeDefined();
});