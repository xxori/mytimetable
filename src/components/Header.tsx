import {
	Button,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Tooltip,
} from '@nextui-org/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LANGUAGES } from '../constants/languages';
import { useHelpModal } from '../helpers/help-modal';

const DEFAULT_LANGUAGE = LANGUAGES[0];

const HEADER_BUTTON_PROPS = {
	size: 'sm',
	isIconOnly: true,
	variant: 'flat',
	color: 'primary',
	className: 'text-xl',
} as const;

export const Header = () => {
	const { t, i18n } = useTranslation();
	const currentLanguage =
		LANGUAGES.find((l) => l.code === i18n.language) ?? DEFAULT_LANGUAGE;

	const openHelpModal = useHelpModal((s) => s.open);

	const [isChangeLanguageOpen, setIsChangeLanguageOpen] = useState(false);

	return (
		<Navbar isBordered maxWidth="xl" position="static">
			<NavbarBrand>
				<img src="/favicon.svg" alt="Logo" className="mr-2 w-6" />
				<h1 className="font-bold text-inherit">MyTimetable</h1>
			</NavbarBrand>
			<NavbarContent justify="end">
				<NavbarItem>
					<Tooltip content={t('header.help')} size="sm">
						<Button {...HEADER_BUTTON_PROPS} onClick={openHelpModal}>
							❓
						</Button>
					</Tooltip>
				</NavbarItem>
				<NavbarItem>
					<Tooltip content={t('header.feedback')} size="sm">
						<Button
							{...HEADER_BUTTON_PROPS}
							as={Link}
							href="https://forms.gle/4HFumRNK8jtEhxJz6"
						>
							🗣
						</Button>
					</Tooltip>
				</NavbarItem>
				<NavbarItem>
					<Popover
						isOpen={isChangeLanguageOpen}
						onOpenChange={(open) => setIsChangeLanguageOpen(open)}
					>
						<Tooltip
							content={t('header.change-language')}
							size="sm"
							isDisabled={isChangeLanguageOpen}
						>
							<div>
								<PopoverTrigger>
									<Button {...HEADER_BUTTON_PROPS} className="font-noto-emoji">
										{currentLanguage.flag}
									</Button>
								</PopoverTrigger>
							</div>
						</Tooltip>
						<PopoverContent>
							{LANGUAGES.map((language) => (
								<Button
									key={language.code}
									fullWidth
									variant="light"
									onClick={() => i18n.changeLanguage(language.code)}
								>
									<span>{language.name} </span>
									<span className="font-noto-emoji">{language.flag}</span>
								</Button>
							))}
						</PopoverContent>
					</Popover>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};
