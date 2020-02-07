/**
 * @description test demo
 * @author yff
 */

/**
 *
 * @param {String} num
 */
const sum = num => {
    return 10 + 20;
};
test("10+20等于30", () => {
    expect(sum()).toBe(30);
});
