import React from 'react'
import {FaGithub} from "react-icons/fa";

export const Footer = () => (
	<footer className="bg-gray-800 text-white py-3 mt-auto">
		<div className="container px-4 mx-auto">
			<ul className="flex flex-col justify-content-between align-baseline gap-2 list-unstyled mb-0 sm:flex-row">
				<li>
					<a
						className="flex"
						href="https://github.com/comrade-tea/react-ts_tic-toe"
						target="_blank"
						rel="noreferrer"
					>
						<FaGithub size={20}/> <span className="ms-2">source code</span>
					</a>
				</li>
				<li>
					<div>
						created by <a href="https://comrade-tea-projects.netlify.app" target="_blank" rel="noreferrer">
						comrade-tea
					</a></div>
				</li>
			</ul>
		</div>
	</footer>
)
