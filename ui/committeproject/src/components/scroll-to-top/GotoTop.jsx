import React from 'react'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { IconButton } from "@mui/material";

const GotoTop = ({ scrollPosition, goToTop }) => {
    return <>{scrollPosition && <IconButton
        title="Scroll to top"
        onClick={goToTop}
        style={{
            position: 'fixed',
            bottom: '20px',
            right: '1%',
            zIndex: 9999,
            backgroundColor: 'gray',
            color: 'white',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
        }}
    >
        <KeyboardDoubleArrowUpIcon />
    </IconButton>}</>
}

export default GotoTop