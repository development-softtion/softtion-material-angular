
/* !
 * Softtion SQLite v1.2.5
 * License: MIT
 * (c) 2015-2018 Softtion Developers
 * Create: 12/Jul/2015
 * Update: 31/Ene/2018
 */

(function (factory) {
    if (typeof jQuery === "function" && typeof window.softtion === "object") {
        factory(jQuery, window.softtion);
    } else { 
        throw new Error("Softtion WebSQL requiere jQuery y Softtion cargado en la Aplicación");
    } // No se ha cargado jQuery y Softtion
})(function (jQuery, softtion) {
    
    var $sqLite = getInstanceSQLite();
    
    softtion.sqLite = $sqLite || {};

    var ErrorSQL = {
            CONNECTION: "No se ha establecido instancia de conexión",
            PARAMETERS: "No se han definido los parámetros requeridos del comando",
            RELATIONS: "No se pudo cargar las relaciones de la consulta"
        },
        operatorsLogic = ["AND", "OR"], 
        operatorsOrder = ["ASC", "DESC"],
        Relations = {
            HAS_ONE: "HAS_ONE", HAS_MANY: "HAS_MANY"
        };
    
    function defineOperatorLogic(operatorLogic) {
        return operatorsLogic.hasItem(operatorLogic) ? operatorLogic : "AND";
    }
    
    function defineOperatorOrder(operatorOrder) {
        return operatorsOrder.hasItem(operatorOrder) ? operatorOrder : "ASC";
    }
    
    function getInstanceSQLite() {
        var fnWebSQL = function () {};
        
        fnWebSQL.isSupported = isSupported; 
        fnWebSQL.openDatabase = openDatabase;
        fnWebSQL.insert = insert;
        fnWebSQL.update = update;
        fnWebSQL.delete = fnDelete;
        fnWebSQL.select = select;
        
        function isSupported() {
            return softtion.isDefined(window.openDatabase);
        };
            
        function openDatabase(options) {
            return new DB(options);
        };
        
        function insert(connection) { 
            var $connection = (connection instanceof DB) ?
                connection.getConnection() : connection;
            
            return new Insert($connection); // Comando INSERT
        };
        
        function update(connection) { 
            var $connection = (connection instanceof DB) ?
                connection.getConnection() : connection;
            
            return new Update($connection); // Comando UPDATE
        };
        
        function fnDelete(connection) { 
            var $connection = (connection instanceof DB) ?
                connection.getConnection() : connection;
            
            return new Delete($connection); // Comando DELETE
        };
        
        function select(connection) { 
            var $connection = (connection instanceof DB) ?
                connection.getConnection() : connection;
            
            return new Select($connection); // Comando SELECT
        };
        
        return fnWebSQL; // Retornando objeto WebSQL
    }
    
    function isFilter(filter) {
        return (softtion.isDefined(filter) && filter instanceof IFilter);
    }
    
    function isRelation(relation) {
        return (softtion.isDefined(relation) && relation instanceof Relation);
    }
    
    // Interfaz IFilter
    
    var IFilter = function () { };
    
    IFilter.prototype.getSentence = function () {};
    IFilter.prototype.getValues = function () {};

    // Clase Condition
    
    var Condition = function (column, operator, value) {
        this.column = column;       // Columna
        this.operator = operator;   // Operador
        this.value = value;         // Valor
    };

    Condition.prototype = new IFilter();
    Condition.prototype.constructor = Condition;

    Condition.prototype.getSentence = function () {
        return "(" + this.column + " " + this.operator + " ?)"; 
    };

    Condition.prototype.getValues = function () { 
        return [this.value];
    };

    // Clase Like
    
    var Like = function (column, value, negation) {
        this.column = column;       // Columna
        this.value = value;         // Valor
        this.negation = negation;   // Negación de condición
    };

    Like.prototype = new IFilter();
    Like.prototype.constructor = Like;

    Like.prototype.getSentence = function () { 
        return "(" + this.column + (this.negation ? " NOT" : "") + " LIKE ?)"; 
    };

    Like.prototype.getValues = function () {
        return softtion.parseArray(this.value);
    };
    
    // Clase In
    
    var In = function (column, values, negation) {
        this.column = column;       // Columna
        this.value = values;        // Valores para In
        this.negation = negation;   // Negación de condición
    };

    In.prototype = new IFilter();
    In.prototype.constructor = In;

    In.prototype.getSentence = function () {
        var filter = "(" + this.column + 
            (this.negation ? " NOT" : "") + " IN (",
            count = this.value.length - 1;
        
        for (var i = 0; i < count; i++) { filter += "?,"; }

        return filter + "?))"; // Retornando filter
    };

    In.prototype.getValues = function () { 
        return softtion.parseArray(this.value); 
    };
    
    // Clase Between

    var Between = function (column, since, until, negation) {
        this.column = column;       // Columna
        this.since = since;         // Valor inicial
        this.until = until;         // Valor final
        this.negation = negation;   // Negación de condición
    };

    Between.prototype = new IFilter();
    Between.prototype.constructor = Between;

    Between.prototype.getSentence = function () {
        return "(" + this.column + (this.negation ? " NOT" : "") + " BETWEEN ? AND ?)";
    };

    Between.prototype.getValues = function () { 
        return softtion.parseArray([this.since, this.until]); 
    };
    
    // Clase IsNull
    
    var IsNull = function (column, negation) {
        this.column = column;       // Columna
        this.negation = negation;   // Negación de condición
    };

    IsNull.prototype = new IFilter();
    IsNull.prototype.constructor = IsNull;
    
    IsNull.prototype.getSentence = function () {
        return "(" + this.column + " IS" + (this.negation ? " NOT" : "") + " NULL";
    };

    IsNull.prototype.getValues = function () { 
        return new Array(); 
    };

    // Clase Filters

    var Filters = function () {
        this.filters = new Array(); // Lista de condiciones
    };

    Filters.prototype = new IFilter();
    Filters.prototype.constructor = Filters;

    Filters.prototype.addFilter = function (filter, operatorLogic) {
        if (isFilter(filter)) {
            operatorLogic = defineOperatorLogic(operatorLogic);
            
            this.filters.push({ 
                filter : filter, operatorLogic : operatorLogic 
            });
        } // Agregando filtro para clausula
        
        return this; // Retornando interfaz fluida
    };

    Filters.prototype.getSentence = function () {
        if (this.filters.isEmpty()) {
            return null;
        } // No se han definido condiciones para clausula Where

        var description = "(", index = 1; // Inicializando filtro
        
        if (this.filters.has(1)) {
            var filter = this.filters.first().filter;
            description += filter.getDescription();
        } else {
            this.filters.forEach(function (json) { 
                var operator = (index === 1) ? "" :
                    (!softtion.isDefined(json.operatorLogic))
                    ? (" " + json.operatorLogic + " ") : "";
                
                if (softtion.isDefined(json.condition)) {
                    var filter = json.filter;
                    description += operator + filter.getDescription();
                    
                    index++; // Siguiente item de la lista
                }
            }); // Recorriendo la lista de condiciones para clausula Where
        }

        return description + ")"; // Retornando filter completado
    };
    
    Filters.prototype.getValues = function () {
        var values = new Array(); // Valores
        
        this.filters.forEach(function (json) {
            var condition = json.condition;
            values = values.concat(condition.getValues());
        });
        
        return values; // Retornando lista de Valores
    };

    // Interfaz IClause

    var IClause = function () { };
    
    IClause.prototype.getSentence = function () { 
        return null;
    };
    
    IClause.prototype.getValues = function () { 
        return []; 
    };

    // Clase Where
        
    var Where = function () { 
        this.filters = new Array(); // Lista de filtros de clausula
    };

    Where.prototype = new IClause();
    Where.prototype.constructor = Where;

    Where.prototype.addFilter = function (filter, operator) {
        if (isFilter(filter)) {
            operator = defineOperatorLogic(operator);
            
            this.filters.push({
                filter: filter, operatorLogic: operator
            });
        } // Agregando filtro para la clausula Where

        return this; // Retornando interfaz fluida
    };
    
    Where.prototype.isEmpty = function () { 
        return this.filters.isEmpty(); 
    };

    Where.prototype.getSentence = function () {
        var filters = this.filters; // Filtros de la clausula
        
        if (filters.isEmpty()) { 
            return null;
        } // No han definido filtros WHERE

        var clause = "WHERE "; // Inicializando clausula
        
        if (filters.has(1)) {
            clause += filters.first().filter.getSentence();
        } else {
            softtion.forEach(filters, function (item, index) {
                if (index !== 0) {
                    clause += " " + item.operatorLogic + " ";
                } // No es el primero de la lista
                
                clause += item.filter.getSentence();
            });
        } // Existen mas de un filtro en la clausula

        return clause.trim(); // Retornando clausula constituida
    };

    Where.prototype.getValues = function () {
        var values = new Array(); // Valores

        this.filters.forEach(function (item) {
            values = values.concat(item.filter.getValues());
        });

        return values; // Retornando valores de la claúsula
    };
    
    // Clase GroupBy
    
    var GroupBy = function () {
        this.columns = new Array(); // Columnas para agrupar
    };

    GroupBy.prototype = new IClause();
    GroupBy.prototype.constructor = GroupBy;
    
    GroupBy.prototype.addColumn = function (column) {
        if (!this.columns.hasItem(column)) {
            this.columns.push(column); 
        } // La columna no ha sido agregada
        
        return this; // Retornando interfaz fluida
    };
    
    GroupBy.prototype.getSentence = function () {
        var columns = this.columns; // Columnas de la clausula
        
        if (columns.isEmpty()) { 
            return null;
        } // No se han definido columna GROUP BY

        var clause = "GROUP BY "; // Inicializando clausula
        
        softtion.forEach(columns, function (column, index) {
            clause += column +
                (((index + 1) !== columns.length) ? ", " : ""); 
        });

        return clause; // Retornando clausula constituida
    };
    
    // Clase OrderBy
    
    var OrderBy = function () {
        this.columns = new Array(); // Lista de columnas
    };

    OrderBy.prototype = new IClause();
    OrderBy.prototype.constructor = OrderBy;
    
    OrderBy.prototype.addColumn = function (column, operator) {
        if (softtion.isDefined(column)) {
            operator = defineOperatorOrder(operator);
            
            this.columns.push({ 
                name: column, operatorOrder: operator 
            });
        } // Agregando columnas para la clausula OrderBy

        return this; // Retornando interfaz fluida
    };
    
    OrderBy.prototype.getSentence = function () {
        var columns = this.columns; // Columnas de la clausula
        
        if (columns.isEmpty()) { 
            return null;
        } // No han definido columnas ORDER BY

        var clause = "ORDER BY "; // Inicializando clausula
        
        softtion.forEach(columns, function (column, index) {
            clause += column.name + " " + column.operatorOrder +
                (((index + 1) !== columns.length) ? ", " : ""); 
        });

        return clause; // Retornando clausula constituida
    };
    
    // Clase Relation
    
    var Relation = function () {
        this.table = undefined; 
        this.localKey = undefined; 
        this.foreignKey = undefined;
        this.type = undefined; 
        this.variableKey = undefined;
    };
    
    Relation.prototype.getTable = function () {
        return this.table;
    };
    
    Relation.prototype.setTable = function (table) {
        this.table = table; return this;
    };
    
    Relation.prototype.getLocalKey = function () {
        return this.localKey;
    };
    
    Relation.prototype.setLocalKey = function (localKey) {
        this.localKey = localKey; return this;
    };
    
    Relation.prototype.getForeignKey = function () {
        return this.foreignKey;
    };
    
    Relation.prototype.setForeignKey = function (foreignKey) {
        this.foreignKey = foreignKey; return this;
    };
    
    Relation.prototype.getType = function () {
        return this.type;
    };
    
    Relation.prototype.setType = function (type) {
        this.type = type; return this;
    };
    
    Relation.prototype.getVariableKey = function () {
        return this.variableKey;
    };
    
    Relation.prototype.setVariableKey = function (variableKey) {
        this.variableKey = variableKey; return this;
    };

    // Interfaz ICommand

    var ICommand = function () { 
        this.connection = undefined;
        this.table = undefined;
        this.columns = new Array();
        this.values = new Array();
    };
    
    ICommand.prototype.getCommand = function () {};
    ICommand.prototype.execute = function () {};
    
    ICommand.prototype.setConnection = function (connection) {
        this.connection = connection; return this;
    };
    
    ICommand.prototype.setTable = function (table) {
        this.table = table; return this;
    };
    
    ICommand.prototype.setColumns = function (columns) {
        this.columns = columns; return this;
    };
    
    ICommand.prototype.setValues = function (values) {
        this.values = values; return this;
    };

    // Interfaz IWhere

    var IWhere = function () { 
        this.whereClause = undefined;
        this.filters = [];
        this.isGroupFilter = false;
    };

    IWhere.prototype = new ICommand();
    IWhere.prototype.constructor = IWhere;
    
    function getInstanceWhere(where) {
        var verify = (
            softtion.isDefined(where) && where instanceof Where
        );

        return (verify) ? where : new Where(); // Retornando Where
    }
    
    var OperatorsLogicName = { AND: "AND", OR: "OR" },
        FiltersName = {
            CONDITION: "CONDITION",
            IS_NULL: "IS_NULL",
            BETWEEN: "BETWEEN",
            IN: "IN", LIKE: "LIKE"
        },
        FilterFactory = function (filterName, attrs) {
            switch (filterName) {
                case (FiltersName.IS_NULL): 
                    return new IsNull(attrs.column, attrs.negation);

                case (FiltersName.CONDITION): 
                    return new Condition(
                        attrs.column, attrs.operator, attrs.values[0]
                    );

                case (FiltersName.IN): 
                    return new In(
                        attrs.column, attrs.values, attrs.negation
                    );

                case (FiltersName.BETWEEN): 
                    return new Between(
                        attrs.column, attrs.values[0], attrs.values[1], attrs.negation
                    );

                case (FiltersName.LIKE): 
                    return new Like(
                        attrs.column, attrs.values[0], attrs.negation
                    );
            };
    };
    
    function defineFilterWhere(attrs) {
        var command = attrs.command, // Instancia del comando
            operatorLogic = attrs.operatorLogic,
            filter = FilterFactory(
                attrs.filterName, attrs.filterAttrs
            );
        
        command.whereClause = getInstanceWhere(command.whereClause); 
        
        if (command.isGroupFilter) {
            command.filters.push({
                filter: filter, operatorLogic: operatorLogic
            });
        } else {
            command.whereClause.addFilter(filter, operatorLogic);
        }
    }
    
    // WHERE: CONDITION FILTER
    
    IWhere.prototype.where = function (column, operator, value) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogicName.AND,
            filterName: FiltersName.CONDITION,
            filterAttrs: {
                column: column, operator: operator, values: [value]
            }
        }); // Agregando filtro
        
        return this; // Retornando iterfaz fluida
    };
    
    IWhere.prototype.orWhere = function (column, operator, value) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogicName.OR,
            filterName: FiltersName.CONDITION,
            filterAttrs: {
                column: column, operator: operator, values: [value]
            }
        }); // Agregando filtro
        
        return this; // Retornando iterfaz fluida
    };
    
    // WHERE: IS NULL FILTER
    
    IWhere.prototype.whereIsNull = function (column) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogicName.AND,
            filterName: FiltersName.IS_NULL,
            filterAttrs: { column: column, negation: false }
        }); // Agregando filtro
        
        return this; // Retornando iterfaz fluida
    };
    
    IWhere.prototype.whereIsNotNull = function (column) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogicName.AND,
            filterName: FiltersName.IS_NULL,
            filterAttrs: { column: column, negation: true }
        }); // Agregando filtro
        
        return this; // Retornando iterfaz fluida
    };
    
    IWhere.prototype.orWhereIsNull = function (column) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogicName.OR,
            filterName: FiltersName.IS_NULL,
            filterAttrs: { column: column, negation: false }
        }); // Agregando filtro
        
        return this; // Retornando iterfaz fluida
    };
    
    IWhere.prototype.orWhereIsNotNull = function (column) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogicName.OR,
            filterName: FiltersName.IS_NULL,
            filterAttrs: { column: column, negation: true }
        }); // Agregando filtro
        
        return this; // Retornando iterfaz fluida
    };
    
    // WHERE: IN FILTER
    
    IWhere.prototype.whereIn = function (column, values) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogicName.AND,
            filterName: FiltersName.IN,
            filterAttrs: { 
                column: column, values: values, negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando iterfaz fluida
    };
    
    IWhere.prototype.whereNotIn = function (column, values) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogicName.AND,
            filterName: FiltersName.IN,
            filterAttrs: { 
                column: column, values: values, negation: true 
            }
        }); // Agregando filtro
        
        return this; // Retornando iterfaz fluida
    };
    
    IWhere.prototype.orWhereIn = function (column, values) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogicName.OR,
            filterName: FiltersName.IN,
            filterAttrs: { 
                column: column, values: values, negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando iterfaz fluida
    };
    
    IWhere.prototype.orWhereNotIn = function (column, values) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogicName.OR,
            filterName: FiltersName.IN,
            filterAttrs: { 
                column: column, values: values, negation: true
            }
        }); // Agregando filtro
        
        return this; // Retornando iterfaz fluida
    };
    
    // WHERE: BETWEEN FILTER
    
    IWhere.prototype.whereBetween = function (column, values) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogicName.AND,
            filterName: FiltersName.BETWEEN,
            filterAttrs: { 
                column: column, values: values, negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando iterfaz fluida
    };
    
    IWhere.prototype.whereNotBetween = function (column, values) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogicName.AND,
            filterName: FiltersName.BETWEEN,
            filterAttrs: { 
                column: column, values: values, negation: true 
            }
        }); // Agregando filtro
        
        return this; // Retornando iterfaz fluida
    };
    
    IWhere.prototype.orWhereBetween = function (column, values) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogicName.OR,
            filterName: FiltersName.BETWEEN,
            filterAttrs: { 
                column: column, values: values, negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando iterfaz fluida
    };
    
    IWhere.prototype.orWhereNotBetween = function (column, values) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogicName.OR,
            filterName: FiltersName.BETWEEN,
            filterAttrs: { 
                column: column, values: values, negation: true
            }
        }); // Agregando filtro
        
        return this; // Retornando iterfaz fluida
    };
    
    // WHERE: LIKE FILTER
    
    IWhere.prototype.whereLike = function (column, value) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogicName.AND,
            filterName: FiltersName.LIKE,
            filterAttrs: { 
                column: column, values: [value], negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando iterfaz fluida
    };
    
    IWhere.prototype.whereNotLike = function (column, value) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogicName.AND,
            filterName: FiltersName.LIKE,
            filterAttrs: { 
                column: column, values: [value], negation: true 
            }
        }); // Agregando filtro
        
        return this; // Retornando iterfaz fluida
    };
    
    IWhere.prototype.orWhereLike = function (column, value) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogicName.OR,
            filterName: FiltersName.LIKE,
            filterAttrs: { 
                column: column, values: [value], negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando iterfaz fluida
    };
    
    IWhere.prototype.orWhereNotLike = function (column, value) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogicName.OR,
            filterName: FiltersName.LIKE,
            filterAttrs: { 
                column: column, values: [value], negation: true
            }
        }); // Agregando filtro
        
        return this; // Retornando iterfaz fluida
    };

    // Interfaz IWhere

    var ISelect = function () { 
        this.orderByClause = undefined;
        this.groupByClause = undefined;
    };

    ISelect.prototype = new IWhere();
    ISelect.prototype.constructor = ISelect;
    
    function getInstanceOrderBy(orderBy) {
        var verify = (
            softtion.isDefined(orderBy) && orderBy instanceof OrderBy
        );

        return (verify) ? orderBy : new OrderBy(); // Retornando OrderBy
    }
    
    function getInstanceGroupBy(groupBy) {
        var verify = (
            softtion.isDefined(groupBy) && groupBy instanceof GroupBy
        );

        return (verify) ? groupBy : new GroupBy(); // Retornando GroupBy
    }
    
    ISelect.prototype.orderBy = function (column, operator) {
        this.orderByClause = getInstanceOrderBy(this.orderByClause); 
        this.orderByClause.addColumn(column, operator); return this;
    };
    
    ISelect.prototype.groupBy = function (column) {
        this.groupByClause = getInstanceGroupBy(this.groupByClause); 
        this.groupByClause.addColumn(column); return this;
    };

    // Clase Insert
    
    var Insert = function (connection) {
        this.setConnection(connection);
    };

    Insert.prototype = new ICommand();
    Insert.prototype.constructor = Insert;

    Insert.prototype.getCommand = function () {
        var table = this.table, columns = this.columns,
            values = this.values;
        
        if (softtion.isUndefined(table) || 
            softtion.isArrayEmpty(values)) {
            return null;
        } // Comando contiene atributos indefinidos

        var command = "INSERT INTO " + table; // Iniciando

        if (!softtion.isArrayEmpty(columns)) {
            command += " ("; // Iniciando cargue columnas
    
            softtion.forEach(columns, function (column, index) {
                command += column +
                    (((index + 1) !== columns.length) ? ", " : ")"); 
            });
        } // Se establecieron los nombres de las columnas

        command += " VALUES ("; // Iniciando cargue de columnas
        
        softtion.forEach(values, function (value, index) {
            command += "?" + (((index + 1) !== values.length) ? ", " : ")"); 
        });
        
        return command; // Retornando comando INSERT
    };

    Insert.prototype.execute = function () {
        var self = this; // Instancia Database
        
        return new Promise(function (resolve, reject) {
            var connection = self.connection;
            
            if (softtion.isDefined(connection)) {
                var command = self.getCommand(); // Comando generado
                
                if (softtion.isDefined(command)) {
                    var values = self.values; // Valores

                    connection.transaction(function (sqlTransaction) {
                        sqlTransaction.executeSql(command, values, 
                            function () { 
                                resolve({ success: true });
                            },
                            function (sqlTransaccion, sqlError) {
                                reject({ sqlError: sqlError });
                            }
                        );
                    });
                } else {
                    resolve({ success: false,  message: ErrorSQL.PARAMETERS });
                } // No se definieron parametros de sentencia
            } else {
                resolve({ success: false, message: ErrorSQL.CONNECTION });
            } // No hay instancia de la conexión definida
        });
    };
    
    Insert.prototype.setJson = function (json) {
        if (softtion.isDefined(json)) {
            var columns = [], values = []; // Columnas y valores
            
            jQuery.each(json, function (key, item) {
                columns.push(key); values.push(item);
            });
            
            this.setColumns(columns); this.setValues(values);
        } // Se establecio correctamente un objeto
        
        return this; // Retornando interfaz fluida
    };

    // Clase Update

    var Update = function (connection) { 
        this.setConnection(connection);
    };

    Update.prototype = new IWhere();
    Update.prototype.constructor = Update;

    Update.prototype.getCommand = function () {
        var table = this.table, columns = this.columns;
        
        if (softtion.isUndefined(table) || 
            softtion.isArrayEmpty(columns)) {
            return null;
        } // Comando contiene atributos indefinidos

        var command = "UPDATE " + table + " SET ";
    
        softtion.forEach(columns, function (column, index) {
            command += column + "=?"; 
            
            if ((index + 1) !== columns.length) {
                command += ", "; 
            } // Aun no se termina de cargar columnas
        });
        
        if (softtion.isDefined(this.whereClause)) { 
            command += " " + this.whereClause.getSentence();
        } // Cargando Clausula WHERE del comando

        return command; // Retornando comando UPDATE
    };

    Update.prototype.execute = function () {
        var self = this; // Instancia Database
        
        return new Promise(function (resolve, reject) {
            var connection = self.connection;
            
            if (softtion.isDefined(connection)) {
                var command = self.getCommand(); // Comando
                
                if (softtion.isDefined(command)) {
                    var values = self.values, // Valores
                        where = self.whereClause;

                    if (softtion.isDefined(where)) {
                        values = values.concat(where.getValues());
                    } // Agrengado valores de Clausula WHERE

                    connection.transaction(function (sqlTransaction) {
                        sqlTransaction.executeSql(command, values, 
                            function (sqlTransaccion, sqlResultSet) { 
                                resolve({ 
                                    success: true,
                                    rowsAffected: sqlResultSet.rowsAffected
                                });
                            },
                            function (sqlTransaccion, sqlError) {
                                reject({ sqlError: sqlError, rowsAffected: -1 });
                            }
                        );
                    });
                } else {
                    resolve({ success: false, message: ErrorSQL.PARAMETERS });
                } // No se definieron parametros de sentencia
            } else {
                resolve({ success: false, message: ErrorSQL.CONNECTION });
            } // No hay instancia de la conexión definida
        });
    };
    
    Update.prototype.setJson = function (json) {
        if (softtion.isDefined(json)) {
            var columns = [], values = []; // Columnas y valores
            
            jQuery.each(json, function (key, item) {
                columns.push(key); values.push(item);
            });
            
            this.setColumns(columns); this.setValues(values);
        } // Se establecio correctamente un objeto
        
        return this; // Retornando interfaz fluida
    };

    // Clase Delete

    var Delete = function (connection) { 
        this.setConnection(connection);
    };

    Delete.prototype = new IWhere();
    Delete.prototype.constructor = Delete;

    Delete.prototype.getCommand = function () {
        var table = this.table; // Tabla del comando
        
        if (softtion.isUndefined(table)) {
            return null;
        } // Comando no tiene tabla definida

        var command = "DELETE FROM " + table; // Iniciando 
        
        if (softtion.isDefined(this.whereClause)) { 
            command += " " + this.whereClause.getSentence(); 
        } // Cargando Clausula WHERE del comando
        
        return command; // Retornando comando DELETE
    };

    Delete.prototype.execute = function () {
        var self = this; // Instancia Database
        
        return new Promise(function (resolve, reject) {
            var connection = self.connection;
            
            if (softtion.isDefined(connection)) {
                var command = self.getCommand(); // Comando
                
                if (softtion.isDefined(command)) {
                    var where = self.whereClause, values;

                    if (softtion.isDefined(where)) {
                        values = where.getValues();
                    } // Agrengado valores de Clausula WHERE

                    connection.transaction(function (sqlTransaction) {
                        sqlTransaction.executeSql(command, values, 
                            function (sqlTransaccion, sqlResultSet) { 
                                resolve({ 
                                    success: true,
                                    rowsAffected: sqlResultSet.rowsAffected
                                });
                            },
                            function (sqlTransaccion, sqlError) {
                                reject({ sqlError: sqlError, rowsAffected: -1 });
                            }
                        );
                    });
                } else {
                    resolve({ success: false, message: ErrorSQL.PARAMETERS });
                } // No se definieron parametros de sentencia
            } else {
                resolve({ success: false, message: ErrorSQL.CONNECTION });
            } // No hay instancia de la conexión definida
        });
    };

    // Clase Select

    var Select = function (connection) {
        this.tables = []; // Tablas
        this.distinct = false;
        this.relations = [];
        
        this.setConnection(connection);
    };

    Select.prototype = new ISelect();
    Select.prototype.constructor = Select;
    
    Select.prototype.setTable = function (table) {
        if (!this.tables.hasItem(table)) {
            this.tables.push(table);
        } // No ha definido esta tabla en el comando
        
        return this; // Retornando intefaz fluida
    };
    
    Select.prototype.setTables = function (tables) {
        if (softtion.isArray(tables)) {
            this.tables = tables;
        } // Tablas establecidas es un Array
        
        return this; // Retornando intefaz fluida
    };
    
    Select.prototype.setDistinct = function (distinct) {
        this.distinct = distinct; return this;
    };
//
    Select.prototype.getRelations = function () {
        return this.relations;
    };

    Select.prototype.hasOne = function (table, local, foreign, variable) {
        this.relations.push(
            new Relation().
                setTable(table).setLocalKey(local).
                setForeignKey(foreign).setVariableKey(variable).
                setType(Relations.HAS_ONE)
        );

        return this; // Retornando interfaz fluida
    };
    
    Select.prototype.hasMany = function (table, local, foreign, variable) {
        this.relations.push(
            new Relation().
                setTable(table).setLocalKey(local).
                setForeignKey(foreign).setVariableKey(variable).
                setType(Relations.HAS_MANY)
        );

        return this; // Retornando interfaz fluida
    };

    Select.prototype.getCommand = function () {
        var tables = this.tables, 
            distinct = this.distinct,
            columns = this.columns;
        
        if (softtion.isArrayEmpty(tables)) {
            return null;
        } // El comando no tiene tablas definidas

        var command = "SELECT" + ((distinct) ? " DISTINCT " : " ");
        
        if (softtion.isArrayEmpty(columns)) {
            command += "*"; // No definío columnas
        } else {
            softtion.forEach(columns, function (column, index) {
                command += column +
                    (((index + 1) !== columns.length) ? ", " : ""); 
            });
        } // Se establecen las columnas definidas en el Comando

        command += " FROM "; // Cargando tabla de consulta
        
        softtion.forEach(tables, function (table, index) {
            command += table +
                (((index + 1) !== tables.length) ? ", " : ""); 
        });

        if (softtion.isDefined(this.whereClause)) {
            command += " " + this.whereClause.getSentence();
        } // Cargando Clausula WHERE del comando

        if (softtion.isDefined(this.groupByClause)) {
            command += " " + this.groupByClause.getSentence();
        } // Cargando Clausula GROUP BY del comando

        if (softtion.isDefined(this.orderByClause)) {
            command += " " + this.orderByClause.getSentence();
        } // Cargando Clausula ORDER BY del comando

        return command; // Retornando sentencia SELECT
    };
    
    function setRelatedObjects
         (select, objects, index, indexRelation, promise) {
             
        var relations = select.getRelations(),
            object = objects[index], 
            relation = relations[indexRelation],
            
            // PARAMETROS DE LA RELACIÓN
            column = relation.getForeignKey(),
            value = object[relation.getLocalKey()];
    
        $sqLite.select().
            setConnection(select.connection).
            setTable(relation.getTable()).
            where(column, "=", value).execute().
            then((result) => {
                if (result.success) {
                    var typeRelation = relation.getType(),
                        data = result.data,
                        key = relation.getVariableKey() || relation.getTable();
                    
                    switch (typeRelation) {
                        case (Relations.HAS_ONE) :
                            object[key] = (data.isEmpty()) ? null : data[0];
                        break;
                        
                        case (Relations.HAS_MANY) : object[key] = data; break;
                    }
                }
                
                indexRelation++; // Incrementa indice de Relacion

                if (indexRelation < relations.length) {
                    setRelatedObjects(
                        select, objects, index, indexRelation, promise
                    );
                } else {
                    indexRelation = 0; index++; // Siguiente item

                    if (index < objects.length) {
                        setRelatedObjects(
                            select, objects, index, indexRelation, promise
                        );
                    } else {
                        promise.resolve({ success: true, data: objects });
                    } // Finalizando proceso Relacional
                } // Ya se cargaron todas las relaciones establecidas
            }).catch((result) => {
                result["message"] = ErrorSQL.RELATIONS;
        
                promise.reject(result); // Resultado final
            });
    }

    Select.prototype.execute = function () {
        var self = this; // Instancia del comando SELECT
        
        return new Promise(function (resolve, reject) {
            var connection = self.connection;
            
            if (softtion.isDefined(connection)) {
                var command = self.getCommand(); // Comando
                
                if (softtion.isDefined(command)) {
                    var where = self.whereClause, values;

                    if (softtion.isDefined(where)) {
                        values = where.getValues();
                    } // Agrengado valores de Clausula WHERE

                    connection.transaction((sqlTransaction) => {
                        sqlTransaction.executeSql(command, values, 
                            (sqlTransaccion, sqlResultSet) => { 
                                var datas = [], // Resultado
                                    rows = sqlResultSet.rows;
                                
                                if (rows.length > 0) {
                                    jQuery.each(rows, (index, row) => {
                                        datas.push(row);
                                    });
                                } // Cargando datos generados
                                
                                if (!datas.isEmpty() && !self.relations.isEmpty()) {
                                    var promise = {
                                        resolve: resolve, reject: reject
                                    };
                                    
                                    setRelatedObjects(self, datas, 0, 0, promise);
                                } else {
                                    resolve({ success: true, data: datas });
                                } // No hay objetos relacionales
                            },
                            
                            (sqlTransaccion, sqlError) => {
                                reject({ sqlError: sqlError });
                            }
                        );
                    });
                } else {
                    resolve({ success: false, message: ErrorSQL.PARAMETERS });
                } // No se definieron parametros de sentencia
            } else {
                resolve({ success: false, message: ErrorSQL.CONNECTION });
            } // No hay instancia de la conexión definida
        });
    };
    
    // Clase ColumnTable
    
    var ColumnTable = function () {
        this.name = undefined; this.type = undefined;
        this.autoIncrement = false;
        this.primaryKey = false; this.notNull = false; 
    };
    
    ColumnTable.prototype.setName = function (name) {
        this.name = name; return this;
    };
    
    ColumnTable.prototype.setType = function (type) {
        this.type = type; return this;
    };
    
    ColumnTable.prototype.setAutoIncrement = function (autoIncrement) {
        this.autoIncrement = autoIncrement; return this;
    };
    
    ColumnTable.prototype.setPrimaryKey = function (primaryKey) {
        this.primaryKey = primaryKey; return this;
    };
    
    ColumnTable.prototype.setNotNull = function (notNull) {
        this.notNull = notNull; return this;
    };
    
    ColumnTable.prototype.getSentence = function () {
        var sentence = this.name + " " + this.type;
        
        if (this.primaryKey) {
            sentence += " PRIMARY KEY";
        } // Columna es llave primaria
        
        if (this.autoIncrement) {
            sentence += " AUTOINCREMENT";
        } // Columna debe auto incrementar
        
        if (this.notNull) {
            sentence += " NOT NULL";
        } // Columna no debe ser Nula
        
        return sentence; // Retornando columna
    };
    
    // Clase Table
    
    var Table = function (name) {
        this.name = name; this.columns = [];
        this.columnsName = []; // Nombre de columnas
        
        this.connection = undefined;
        this.notExists = false;
    };
    
    Table.prototype.setConnection = function (connection) {
        this.connection = connection; return this;
    };
    
    Table.prototype.setNotExists = function (notExists) {
        this.notExists = notExists; return this;
    };
    
    Table.prototype.getName = function () {
        return this.name;
    };
    
    Table.prototype.addColumn = function (attrs) {
        if (softtion.isString(attrs.name) && softtion.isString(attrs.type)) {
            if (!this.columnsName.hasItem(attrs.name)) {
                
                // Agregando columna de tabla
                this.columns.push(
                    new ColumnTable().
                        setName(attrs.name).setType(attrs.type).
                        setPrimaryKey(attrs.primaryKey).
                        setAutoIncrement(attrs.autoIncrement).
                        setNotNull(attrs.notNull)
                );
        
                this.columnsName.push(name);
            } // Columna no ha sido registrada
        } // Se establecieron parametros necesarios correctamente
        
        return this; // Retornando interfaz fluida
    };
    
    Table.prototype.getColumns = function () {
        return this.columns;
    };
    
    Table.prototype.getSentence = function () {
        var columns = this.columns; // Columnas
        
        if (!softtion.isString(this.name) && columns.isEmpty()) {
            return null;
        } // No ha definido parametros correctamente
        
        var command = "CREATE TABLE" + // Iniciando comando
            ((!this.notExists) ? " IF NOT EXISTS" : ""); 

        command += " " + this.name + " ("; // Nombre de tabla
        
        softtion.forEach(columns, function (column, index) {
            
            command += column.getSentence() +
                (((index + 1) !== columns.length) ? ", " : ""); 
        });

        return command + ");"; // Retornando comando final
    };
    
    Table.prototype.create = function () {
        var self = this; // Instancia de la Tabla
        
        return new Promise(function (resolve, reject) {
            var connection = self.connection;
            
            if (softtion.isDefined(connection)) {
                var command = self.getSentence();
                
                if (softtion.isDefined(command)) {
                    connection.transaction(function (sqlTransaction) {
                        sqlTransaction.executeSql(command, [], 
                            function () { 
                                resolve({ success: true });
                            },
                            function (sqlTransaccion, sqlError) {
                                reject({ sqlError: sqlError });
                            }
                        );
                    });
                } else {
                    resolve({ success: false, message: ErrorSQL.PARAMETERS });
                } // Parametros establecidos son insuficientes
            } else {
                resolve({ success: false, message: ErrorSQL.CONNECTION });
            } // No hay instancia de la conexión
        });
    };

    Table.prototype.drop = function (table) {
        var self = this; // Instancia Database
        
        return new Promise(function (resolve, reject) {
            var connection = self.connection;
            
            if (softtion.isDefined(connection)) {
                var command = "DROP TABLE " + table; // Comando DROP
                
                connection.transaction(function (sqlTransaction) {
                    sqlTransaction.executeSql(command, [], 
                        function () { 
                            resolve({ success: true });
                        },
                        function (sqlTransaccion, sqlError) {
                            reject({ sqlError: sqlError });
                        }
                    );
                });
            } else {
                resolve({ success: false, message: ErrorSQL.CONNECTION });
            } // No hay instancia de la conexión
        });
    };
    
    // Clase DB
    
    var DB = function ($options) {
        this.connection = undefined;
        
        if ($sqLite.isSupported()) {
            var defaults = {
                descripcion: "Softtion",
                version: "1.0.0", 
                size: 2 * 1024 * 1024
            };

            var options = jQuery.extend({}, defaults, $options);
            
            this.connection = window.openDatabase(
                options.name, options.version,
                options.description, options.size           
            );
        } // Navegador soporta WebSQL, iniciando DB
    };

    DB.prototype.getConnection = function () {
        return this.connection;
    };
    
    DB.prototype.table = function (name) {
        return new Table(name).setConnection(this.connection);
    };
});