from maxapi.types import BotStarted, MessageCreated
from maxapi.filters.command import Command
from maxapi.enums.parse_mode import ParseMode

from bot import messages


def register_about_handlers(dp):
    """Register about-related handlers"""

    @dp.message_created(Command("about"))
    async def help(event: MessageCreated) -> None:
        """Handles /start command"""
        await event.message.answer(
            text=messages.ABOUT_MSG,
            parse_mode=ParseMode.MARKDOWN
        )