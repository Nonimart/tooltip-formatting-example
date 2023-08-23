import { __ } from "@wordpress/i18n";
import { registerFormatType, toggleFormat, applyFormat, getActiveFormats } from "@wordpress/rich-text";

import { BlockControls, __experimentalLinkControl as LinkControl } from "@wordpress/block-editor";
import { Popover, ToolbarGroup, ToolbarButton } from "@wordpress/components";
import { trash } from "@wordpress/icons";
import { useState, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data"; // pour les querry

const formatName = "homegrade-format/tooltip";

const Edit = (props) => {
	const { isActive, value, onChange } = props;
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const [popoverText, setPopoverText] = useState("");
	const [pendingDefinition, setPendingDefinition] = useState(false);

	const activeFormat = getActiveFormats(props.value).filter((format) => format.type === formatName)[0];

	const post = useSelect((select) => {
		if (activeFormat && activeFormat.attributes.definitionId) {
			return select("core").getEntityRecord("postType", "vocabulaire", 940);
		}
	});

	if (post && pendingDefinition) {
		onChange(
			applyFormat(value, {
				type: formatName,
				attributes: {
					dataTooltip: post.acf.definition,
					definitionId: activeFormat.attributes.definitionId,
				},
			})
		);
		setPendingDefinition(false);
	}

	function removeFormat() {
		setIsPopoverOpen(false);
		onChange(
			toggleFormat(value, {
				type: formatName,
			})
		);
	}
	function setFormat(postDatas) {
		setPendingDefinition(true);
		setIsPopoverOpen(false);

		onChange(
			applyFormat(value, {
				type: formatName,
				attributes: {
					definitionId: postDatas.id.toString(),
				},
			})
		);
	}

	return (
		<>
			<BlockControls>
				{isPopoverOpen && (
					<Popover
						onClose={() => setIsPopoverOpen(false)}
						className='popover_tooltip_field'>
						<LinkControl
							suggestionsQuery={{
								type: "post",
								subtype: "vocabulaire",
							}}
							onChange={(postDatas) => setFormat(postDatas)}
						/>
					</Popover>
				)}

				<ToolbarGroup>
					<ToolbarButton
						isActive={isActive}
						icon={!isActive ? "admin-comments" : trash}
						label={!isActive ? "Add tooltip" : "Delete tooltip"}
						onClick={() => {
							!isActive ? setIsPopoverOpen(true) : removeFormat();
						}}
					/>
				</ToolbarGroup>
			</BlockControls>
		</>
	);
};

registerFormatType(formatName, {
	title: __("Tooltip", "homegrade-format"),
	tagName: "span",
	attributes: {
		definitionId: "data-definition-id",
		dataTooltip: "data-tooltip",
	},
	className: "tooltip-word",
	edit: Edit,
});
