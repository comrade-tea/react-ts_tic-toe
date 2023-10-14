import React, {FC, ReactNode} from 'react'
import styles from "./LabelWrap.module.css"

interface ILabel {
	labelText: string
	children: ReactNode
}

const LabelWrap: FC<ILabel> = ({labelText, children}) => {
	return (
		<label className={styles.label}>
			<span className={styles.text}>
				{labelText}
			</span>
			{children}
		</label>
	)
}

export default LabelWrap
