from django.db import models
from django.utils.translation import gettext_lazy as _


STATUS_CHOICES = (
    ('Not Complete', 'Not Complete'),
    ('Pending', 'Pending'),
    ('Complete', 'Complete'),
)


class Todo(models.Model):
    title = models.CharField(_('Title'), max_length=1000)
    description = models.TextField(_('Description'), blank=True)
    status = models.CharField(
        _('Status'), max_length=20,
        choices=STATUS_CHOICES, default='Not Complete')

    created_at = models.DateTimeField(_('Created at'), auto_now_add=True)

    def __str__(self) -> str:
        return f'{self.title}'

    class Meta:
        verbose_name = _('Todo')
        ordering = ('-created_at',)
