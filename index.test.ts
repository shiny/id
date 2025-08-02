import { expect, test } from "bun:test";

import { generateShinyId, getInstanceIdFromShinyId, getTimestampFromShinyId } from './index'


test("generateShinyId", () => {
    const id = generateShinyId({
        prefix: 'usr',
    })
    console.log(id)
    expect(id).toStartWith('usr_')
    expect(id).not.toBeEmpty()
});

test('generateShinyId with custom epoch', () => {
    const customEpoch = 1754074255256
    const id = generateShinyId({
        prefix: 'usr',
        epoch: customEpoch
    })
    console.log(id)
    expect(id).toStartWith('usr_')
})

test("generateShinyId with custom separator", () => {
    const id = generateShinyId({
        prefix: 'usr',
        epoch: 1754074255256,
        separator: '-'
    })
    expect(id).toStartWith('usr-')
});

test("generateShinyId with custom instanceId", () => {
    const id = generateShinyId({
        prefix: 'usr',
        epoch: 1754074255256,
        instanceId: 1,
        separator: '-'
    })
    expect(id).toStartWith('usr-')
});

test("getInstanceIdFromShinyId", () => {
    const instanceId = Math.round(Math.random() * 4095)
    const id = generateShinyId({
        prefix: 'usr',
        epoch: 1754074255256,
        instanceId: instanceId,
        separator: '-'
    })
    const parsedInstanceId = getInstanceIdFromShinyId({
        id,
        separator: '-'
    })
    expect(parsedInstanceId).toBe(instanceId)
})

test('getTimestampFromShinyId', () => {
    const customEpoch = 1754074255256
    const id = generateShinyId({
        prefix: 'usr',
        epoch: customEpoch,
        separator: '-'
    })
    const now = Date.now()
    const timestamp = getTimestampFromShinyId({
        id,
        epoch: customEpoch,
        separator: '-'
    })
    expect(timestamp).toBeWithin(now - 3000, now + 3000)
})