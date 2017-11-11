"""empty message

Revision ID: 7f5c42716244
Revises: 12f836b88a66
Create Date: 2017-11-11 13:14:44.029042

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7f5c42716244'
down_revision = '12f836b88a66'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_index(op.f('ix_designs_user'), 'designs', ['user'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_designs_user'), table_name='designs')
    # ### end Alembic commands ###
