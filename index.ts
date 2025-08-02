import { Snowflake } from 'nodejs-snowflake'
import base62 from '@sindresorhus/base62'

export interface GenerateShinyIdParams {
    prefix: string
    epoch?: number
    instanceId?: number
    separator?: string
}

/**
 * Generate a prefixed ID that is a Base62-encoded Snowflake ID
 * @param param0.prefix The prefix to use for the ID
 * @param param0.epoch The epoch to use for the snowflake instance
 * @param param0.separator The separator to use between the prefix and the ID
 * @param param0.instanceId A value ranging between 0 - 4095. If not provided then a random value will be used
 * @returns A prefixed ID that is a Base62-encoded Snowflake ID
 */
export function generateShinyId({
    prefix,
    epoch = 0,
    instanceId,
    separator = '_'
}: GenerateShinyIdParams) {
    const uid = new Snowflake({ custom_epoch: epoch, instance_id: instanceId })
    const id = uid.getUniqueID()
    return `${prefix}${separator}${base62.encodeBigInt(id.valueOf())}`
}

export interface GetInstanceFromShinyIdParams {
    id: string
    separator?: string
}
export function getInstanceIdFromShinyId({
    id,
    separator = '_'
}: GetInstanceFromShinyIdParams) {
    const [, base62Id] = id.split(separator)
    const snowflakeId = base62.decodeBigInt(base62Id)
    return Snowflake.instanceIDFromID(snowflakeId)
}

export interface GetTimestampFromShinyIdParams {
    id: string
    epoch?: number
    separator?: string
}
export function getTimestampFromShinyId({
    id,
    epoch = 0,
    separator = '_'
}: GetTimestampFromShinyIdParams) {
    const [, base62Id] = id.split(separator)
    const snowflakeId = base62.decodeBigInt(base62Id)
    return Snowflake.timestampFromID(snowflakeId, epoch)
}
