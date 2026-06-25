// ES代码-质量检查工具,用于发现代码问题和统一代码风格。
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    // Prettier 格式化规则
    'prettier/prettier': 'error',
    
    // Vue 相关规则
    'vue/multi-word-component-names': 'off',  // 允许单单词组件名（如 Home.vue）
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],  // 模板中组件用 PascalCase
    'vue/require-default-prop': 'error',  // Props 必须有默认值
    'vue/v-bind-style': ['error', 'shorthand'],  // v-bind 使用简写 :prop
    
    // TypeScript 相关规则
    '@typescript-eslint/no-explicit-any': 'warn',  // 警告使用 any 类型
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',  // 允许 _prefix 的参数
        varsIgnorePattern: '^_'   // 允许 _prefix 的变量
      }
    ],
    '@typescript-eslint/no-non-null-assertion': 'warn',  // 警告使用 !. 非空断言
    '@typescript-eslint/explicit-function-return-type': 'off',//可选：是否强制函数返回类型

    // JavaScript 基础规则
    'no-var': 'error',  // 禁止使用 var
    'eqeqeq': ['error', 'always'],  // 强制使用 ===
    'no-empty': 'error',  // 禁止空块语句
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 7. 禁止未使用的导入
    '@typescript-eslint/no-unused-imports': 'error',


    // 9. 强制 import 顺序（需安装 eslint-plugin-import）
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always'
      }
    ],

    // 10. 禁止魔法数字（需根据项目调整）
    'no-magic-numbers': ['warn', { ignore: [0, 1, -1] }]
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
}
