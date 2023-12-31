import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('name', 100).notNullable()
      table.string('birthdate', 10).notNullable()
      table.string('email', 100).unique()
      table.string('password').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
