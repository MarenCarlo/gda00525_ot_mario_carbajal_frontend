import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export const Navigation = ({ currentTab, RoutesElements, onTabChange }: any) => {
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        onTabChange(newValue);
    };
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '15px' }}>
            <Tabs
                sx={{ width: '100%', justifyContent: 'space-around' }}
                value={currentTab}
                onChange={handleTabChange}
                centered
            >
                {RoutesElements.map((route: any) => (
                    <Tab
                        key={route.value}
                        label={route.label}
                        value={route.value}
                    />
                ))}
            </Tabs>
        </Box>
    );
};