import React, { FC, memo, useEffect, useRef, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';

export type Option = {
    value: number
    label: string
    handler: () => void
}
export type DropdownProps = {
    options: Option[],
}
const BaseDropDownMunuMemo: FC<DropdownProps> = ({
    options,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const handleSelect = (option: Option) => {
        option.handler()
        setIsOpen(false)
    }

    const closeMenu = (e: MouseEvent) => {
        if(menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', closeMenu)
        return () => {
            document.removeEventListener('click', closeMenu)
        }
    }, [])
    const handleIconClick = () => {
        setIsOpen(!isOpen)
    };

    return (
        <div ref={menuRef}>
            <MenuIcon onClick={handleIconClick} style={{ cursor: 'pointer' }} />
            {isOpen && (
                <ul className='dropdown-munu'>
                    {isOpen && (
                        <ul className="dropdown-menu">
                            {options.map((option) => (
                            <li key={option.value} onClick={() => handleSelect(option)}>
                                {option.label}
                            </li>
                            ))}
                        </ul>
                        )}
                </ul>
            )}
        </div>
    );
};

export const BaseDropDownMunu = memo(BaseDropDownMunuMemo);
