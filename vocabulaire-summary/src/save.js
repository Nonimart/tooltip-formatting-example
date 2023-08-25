import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes, setAttributes }) {
	let { tooltipWords, thematiqueName } = attributes;
	function handleClick() {
		alert("hey");
	}
	return (
		<section
			{...useBlockProps.save({
				className: `vocabulaire-summary`,
			})}
		>
			<h3 className="homegrade-blocks-vocabulaire-summary__title">
				Vocabulaire — {thematiqueName}
			</h3>{" "}
			{tooltipWords &&
				tooltipWords.map((elem) => (
					<details class=" question">
						<summary onClick={handleClick}>{elem.tooltipText} </summary>
						<div className="homegrade-blocks-vocabulaire-summary__content-wrapper">
							<p className="homegrade-blocks-vocabulaire-summary__content">
								{elem.tooltipDefinition}
							</p>
						</div>
					</details>
				))}
		</section>
	);
}
