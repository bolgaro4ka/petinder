from maxapi.types import BotStarted, MessageCreated
from maxapi.filters.command import Command
from maxapi.enums.parse_mode import ParseMode

from bot import messages


def register_help_handlers(dp):
    """Register help-related handlers"""

    @dp.message_created(Command("help"))
    async def help(event: MessageCreated) -> None:
        """Handles /start command"""
        await event.message.answer(
            text=messages.HELP_MSG,
            parse_mode=ParseMode.MARKDOWN
        )