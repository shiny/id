# @shiny/id

[![test](https://github.com/shiny/id/actions/workflows/test.yml/badge.svg)](https://github.com/shiny/id/actions/workflows/test.yml)

Generate Stripe-style Snowflake IDs. For why you might want to do this, refer to this article: [Designing APIs for humans: Object IDs](https://dev.to/stripe/designing-apis-for-humans-object-ids-3o5a)

> [!CAUTION]
> Currently in preview stage, please use with caution

## Installation

```bash
bun add @shiny/id
```

## Generate Shiny ID

```typescript
import { generateShinyId } from '@shiny/id'

const id = generateShinyId({
  prefix: 'usr',
})
// Output example: usr_8lUf4MDxgEy
```

Underlying implementation: Uses nodejs-snowflake to generate a bigint snowflake, converts it to base62 format, and adds a user-defined prefix.
Note: Theoretically generates up to 1,024,000 IDs per second, naturally blocking.

## Custom Epoch

Using a Custom Epoch instead of the default 1970 will make your generated IDs shorter.
For example, in my current test, with epoch set to default 0, the generated ID is `usr_8lUf4MDxgEy`; while with epoch set to current time, the generated ID is `usr_yM0lunVA`, which is 3 characters shorter.

```typescript
import { generateShinyId } from '@shiny/id'

const customEpoch = 1754074255256
const id = generateShinyId({
  prefix: 'usr',
  epoch: customEpoch
})
```

## Custom Separator

The default separator is `_`, because double-clicking such an ID will automatically select the text — while `-` does not. You can customize the separator.

```typescript
import { generateShinyId } from '@shiny/id'

const id = generateShinyId({
  prefix: 'usr',
  separator: '-'
})
```

## Instance ID

Due to the speed of single-machine Snowflake generation, multiple instance IDs are suitable for distributed ID generation.
The instanceId range is 0 - 4095, and when not set, it defaults to a random number.

```typescript
import { generateShinyId } from '@shiny/id'

const id = generateShinyId({
  prefix: 'usr',
  instanceId: 1,
})
const instanceId = getInstanceIdFromShinyId(id)
```

## License

MIT
