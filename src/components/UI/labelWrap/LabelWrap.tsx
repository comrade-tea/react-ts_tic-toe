import type { FC, ReactNode } from 'react'
import React from 'react'

import styles from './LabelWrap.module.css'

interface ILabel {
  labelText: string
  children: ReactNode
}

export const LabelWrap: FC<ILabel> = ({ labelText, children }) => (
  <label className={styles.label}>
    <span className={styles.text}>{labelText}</span>
    {children}
  </label>
)
