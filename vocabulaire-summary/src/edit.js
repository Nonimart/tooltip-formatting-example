import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import "./editor.scss";
import { useEntityRecord } from "@wordpress/core-data";
import { useState } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import { useEffect } from "@wordpress/element";
import { useEntityProp } from "@wordpress/core-data";

function CurrentThematiqueDisplay({ id }) {
	const { record, isResolving } = useEntityRecord(
		"taxonomy",
		"thematiques",
		id
	);

	if (isResolving) {
		return "Loading...";
	}
	if (!record) {
		return "no post...";
	}
	return record.name;
}
function getCurrentThematique(id) {
	const { record, isResolving } = useEntityRecord(
		"taxonomy",
		"thematiques",
		id
	);

	if (isResolving) {
		return "Loading...";
	}
	if (!record) {
		return "no post...";
	}
	return record;
}

function buildTooltipWords(editorContent) {
	// Parsing Content
	const parser = new DOMParser();
	const doc = parser.parseFromString(editorContent, "text/html");
	const domTooltipWords = doc.querySelectorAll(".tooltip-word");

	const filteredTooltipWords = [];

	// Looping over tooltip words and filtering duplicates
	Array.from(domTooltipWords).forEach((tooltipWord) => {
		const tooltipID = tooltipWord.getAttribute("data-definition-id");
		const tooltipText = tooltipWord.getAttribute("data-tooltip-word");
		const tooltipDefinition = tooltipWord.getAttribute(
			"data-tooltip-definition"
		);

		const existingTooltip = filteredTooltipWords.find(
			(item) => item.tooltipID === tooltipID
		);

		if (!existingTooltip) {
			filteredTooltipWords.push({
				tooltipID,
				tooltipText,
				tooltipDefinition,
			});
		}
	});
	return filteredTooltipWords;
}

export default function Edit({ attributes, setAttributes }) {
	let { tooltipWords, thematiqueName } = attributes;
	let [hasFetchedDatas, setHasFetchedDatas] = useState(false);

	const currentPost = useSelect((select) =>
		select("core/editor").getCurrentPost()
	);
	const currentTaxonomies = useSelect((select) =>
		select("core/editor").getCurrentPostAttribute("thematiques")
	);
	let fetchedCurrentThematique = useSelect(
		(select) =>
			select("core").getEntityRecord(
				"taxonomy",
				"thematiques",
				currentTaxonomies[0] // or currentPost.thematiques[0] works as well
			),
		[currentTaxonomies]
	);

	if (!currentPost || !currentPost.content) {
		return <p>Loading...</p>;
	}

	useEffect(() => {
		if (currentPost.content) {
			let newTooltipWords = buildTooltipWords(currentPost.content);
			setAttributes({ tooltipWords: newTooltipWords });
		}
	}, [currentPost]);

	useEffect(() => {
		if (!fetchedCurrentThematique) return;
		setAttributes({ thematiqueName: fetchedCurrentThematique.name });
	}, [fetchedCurrentThematique, currentPost]);

	return (
		<section {...useBlockProps()}>
			<h3 className="homegrade-blocks-vocabulaire-summary__title">
				Vocabulaire — {thematiqueName}
			</h3>
			{tooltipWords &&
				tooltipWords.map((elem) => (
					<details className=" question">
						<summary
							onClick={() => {
								alert("hey");
							}}
						>
							{elem.tooltipText}{" "}
						</summary>

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
