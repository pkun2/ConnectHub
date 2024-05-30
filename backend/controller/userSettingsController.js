import UserSetting from '../model/UserSetting.js';

export const updateUserSettings = async (req, res) => {
    const userId = req.params.userId;
    const settings = req.body;

    try {
        await UserSetting.update(userId, settings);
        res.status(200).json({ message: 'Settings updated successfully' });
    } catch (error) {
        console.error('Settings update error:', error);
        res.status(500).json({ error: 'Failed to update settings' });
    }
};

export const getUserSettings = async (req, res) => {
    const userId = req.params.userId;

    try {
        const settings = await UserSetting.getSettings(userId);
        res.status(200).json(settings);
    } catch (error) {
        console.error('Settings retrieval error:', error);
        res.status(500).json({ error: 'Failed to get settings' });
    }
};
