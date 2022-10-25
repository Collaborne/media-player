[@collaborne/video-player - v1.1.2](/docs/../README.md) / [Modules](/docs/modules.md) / types/required-and-optional-pick

# Module: types/required-and-optional-pick

## Table of contents

### Type Aliases

- [RequiredAndOptionalPick](/docs/modules/types_required_and_optional_pick.md#requiredandoptionalpick)

## Type Aliases

### RequiredAndOptionalPick

Ƭ **RequiredAndOptionalPick**<`T`, `K`, `U`\>: `Required`<`Pick`<`T`, `K`\>\> & `Pick`<`T`, `U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `T` |
| `U` | extends keyof `T` |

#### Defined in

[src/types/required-and-optional-pick.ts:1](https://github.com/Collaborne/video-player/blob/1c3dd32/src/types/required-and-optional-pick.ts#L1)
