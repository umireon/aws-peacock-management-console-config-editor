import Form, { IChangeEvent, ISubmitEvent } from '@rjsf/core'
import { useState } from 'react'
import { JSONSchema7 } from 'json-schema'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'

export interface Environment {
  readonly account: string
  readonly region?: string
}

export interface Style {
  readonly navigationBackgroundColor?: string
  readonly accountMenuButtonBackgroundColor?: string
}

export interface Config {
  readonly env: Environment[]
  readonly style: Style
}

export type ConfigList = Config[]

const initialConfig: ConfigList = [
  {
    env: [
      {
        account: '111111111111'
      }
    ],
    style: {
      navigationBackgroundColor: '#65c89b',
      accountMenuButtonBackgroundColor: '#945bc4'
    }
  },
  {
    env: [
      {
        account: '222222222222',
        region: 'us-east-1'
      },
      {
        account: '333333333333'
      }
    ],
    style: {
      navigationBackgroundColor: '#3399ff',
      accountMenuButtonBackgroundColor: '#bf0060'
    }
  }
]


export const CONFIG_SCHEMA: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'array',
  items: {
    type: 'object',
    required: ['env'],
    properties: {
      env: {
        title: 'Environment',
        type: 'array',
        items: {
          type: 'object',
          required: ['account'],
          properties: {
            account: {
              title: 'Account',
              type: 'string',
              pattern: '^\\d{12}$',
            },
            region: {
              title: 'Region',
              type: 'string',
            },
          },
        },
      },
      style: {
        title: 'Style',
        type: 'object',
        properties: {
          navigationBackgroundColor: {
            title: 'Navigation Background Color',
            type: 'string',
          },
          accountMenuButtonBackgroundColor: {
            title: 'Account Menu Button Color',
            type: 'string',
          },
        },
      },
    },
  },
  definitions: {
    env: {
      type: 'object',
      required: ['account'],
      properties: {
        account: {
          title: 'Account',
          type: 'string',
          pattern: '^\\d{12}$',
        },
        region: {
          title: 'Region',
          type: 'string',
        },
      },
    },
  },
}

export const App = () => {
  const [config, setConfig] = useState(initialConfig)
  const handleChange = (e: IChangeEvent<ConfigList>) => {
    setConfig(e.formData)
  }
  return (
    <main id="main">
      <Form
        schema={CONFIG_SCHEMA}
        formData={config}
        onChange={handleChange}
      />
      <textarea>
        {JSON.stringify(config, null, 2)}
      </textarea>
    </main>
  )
}
