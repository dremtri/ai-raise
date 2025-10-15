import { FlatConfigComposer } from "eslint-flat-config-utils";
import antfu from '@antfu/eslint-config'
import type { Linter  } from 'eslint'
import type { TypedFlatConfigItem, Awaitable, ConfigNames } from '@antfu/eslint-config'

export const createNuxtEslintConfig = (...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> => {
  return antfu(
    {
      formatters: true,
      unocss: true,
      vue: true,
      rules: {
        'no-console': 'off',
        'vue/html-self-closing': 'off',
        'vue/block-order': ['error', {
          order: [['template', 'script'], 'style'],
        }],
        'prefer-promise-reject-errors': 'off',
        'n/prefer-global/process': 'off',
      },
    },
    ...userConfigs
  )
}