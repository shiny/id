# @shiny/id

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

底层实现：使用 nodejs-snowflake 生成一个 bigint 的 snowflake，转换成 base62 格式，并添加用户自定义的 prefix。
注意：理论上每秒最多生成 1,024,000 个 ID，天生是 block 的。


## Custom Epoch

使用 Custom Epoch，而不是默认的 1970 年，你生成的 id 将会更简短。
例如我现在测试， epoch 为默认的 0，生成的 id 为 `usr_8lUf4MDxgEy`；而 epoch 为 当前时间，生成的 id 为 `usr_yM0lunVA`，少了 3 位。
```typescript
import { generateShinyId } from '@shiny/id'

const customEpoch = 1754074255256
const id = generateShinyId({
  prefix: 'usr',
  epoch: customEpoch
})
```

## Custom Separator

默认的分隔符为 `_`，因为鼠标双击这样的 id 会自动选中文本 —— 而 `-` 则不行。你可以自定义分隔符。
```typescript
import { generateShinyId } from '@shiny/id'

const id = generateShinyId({
  prefix: 'usr',
  separator: '-'
})
```

## Instance ID
由于单机的生成 Snowflake 的速度 ，多个 instance ID 适合分布式生成 ID。
instanceId 的范围是 0 - 4095，未设置时则是随机数字。

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
