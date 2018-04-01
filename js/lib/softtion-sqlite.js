
/* !
 * Softtion sqLite v1.4.1
 * License: MIT
 * (c) 2015-2018 Softtion Developers
 * Create: 12/Jul/2015
 * Update: 03/Feb/2018
 */

((factory) => {
    if (typeof jQuery === "function" && typeof window.softtion === "object") {
        factory(jQuery, window.softtion);
    } else { 
        throw new Error("Softtion WebSQL requiere jQuery y Softtion cargado en la Aplicación");
    } // No se ha cargado jQuery y Softtion
})((jQuery, softtion) => {
    
    var $sqLite = getInstanceSQLite();
    
    softtion.sqLite = $sqLite || {};

    var ErrorSQL = {
            CONNECTION: "No se ha establecido instancia de conexión",
            PARAMETERS: "No se han definido los parámetros requeridos del comando",
            RELATIONS: "No se pudo cargar las relaciones de la consulta"
        },
                
        Relations = { HAS_ONE: "HAS_ONE", HAS_MANY: "HAS_MANY" },
    
        OperatorsLogic = { AND: "AND", OR: "OR" },
        
        ArrayOperatorsLogic = [ OperatorsLogic.AND, OperatorsLogic.OR ], 
    
        OperatorsOrder = { ASC: "ASC", DESC: "DESC" },
        
        ArrayOperatorsOrder = [ OperatorsOrder.ASC, OperatorsOrder.DESC ],
        
        FiltersName = {
            CONDITION: "CONDITION",
            IN: "IN", 
            LIKE: "LIKE",
            GLOB: "GLOB",
            IS_NULL: "IS_NULL",
            BETWEEN: "BETWEEN"
        },
        
        FilterFactory = (filterName, attrs) => {
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

                case (FiltersName.GLOB): 
                    return new Glob(
                        attrs.column, attrs.values[0], attrs.negation
                    );
            };
        };
    
    function defineOperatorLogic(operator) {
        return ArrayOperatorsLogic.hasItem(operator) ? operator : "AND";
    }
    
    function defineOperatorOrder(operator) {
        return ArrayOperatorsOrder.hasItem(operator) ? operator : "ASC";
    }
    
    function getInstanceSQLite() {
        var sqLite = function () {};
        
        sqLite.isSupported = isSupported; 
        sqLite.openDatabase = openDatabase;
        sqLite.insert = insert;
        sqLite.insertArray = insertArray;
        sqLite.update = update;
        sqLite.delete = fnDelete;
        sqLite.select = select;
        
        function isSupported() {
            return softtion.isDefined(window.openDatabase);
        };
            
        function openDatabase(options) {
            return new DB(options);
        };
        
        function insert(connection) {
            return new Insert(connection); // Comando INSERT
        };
        
        function insertArray(connection) {            
            return new InsertArray(connection); // Comando INSERT
        };
        
        function update(connection) {
            return new Update(connection); // Comando UPDATE
        };
        
        function fnDelete(connection) {
            return new Delete(connection); // Comando DELETE
        };
        
        function select(connection) {
            return new Select(connection); // Comando SELECT
        };
        
        return sqLite; // Retornando objeto WebSQL
    }
    
    function isFilter(filter) {
        return (softtion.isDefined(filter) && filter instanceof IFilter);
    }
    
    // Interfaz IFilter
    
    var IFilter = function () { };
    
    IFilter.prototype.getSentence = function () { };
    
    IFilter.prototype.getValues = function () { };

    // Clase Condition
    
    var Condition = function (column, operator, value) {
        this.column = column;
        this.value = value;
        this.operator = operator;
    };

    Condition.prototype = new IFilter();
    Condition.prototype.constructor = Condition;

    Condition.prototype.getValues = function () { 
        return [ this.value ];
    };

    Condition.prototype.getSentence = function () {
        return "(" + this.column + " " + this.operator + " ?)"; 
    };

    // Clase Like
    
    var Like = function (column, value, negation) {
        this.column = column;
        this.value = value;
        this.negation = negation;
    };

    Like.prototype = new IFilter();
    Like.prototype.constructor = Like;

    Like.prototype.getValues = function () {
        return [ this.value ];
    };

    Like.prototype.getSentence = function () { 
        return "(" + this.column + (this.negation ? " NOT" : "") + " LIKE ?)"; 
    };

    // Clase Glob
    
    var Glob = function (column, value, negation) {
        this.column = column;
        this.value = value;
        this.negation = negation;
    };

    Glob.prototype = new IFilter();
    Glob.prototype.constructor = Glob;

    Glob.prototype.getValues = function () {
        return [ this.value ];
    };

    Glob.prototype.getSentence = function () { 
        return "(" + this.column + (this.negation ? " NOT" : "") + " GLOB ?)"; 
    };
    
    // Clase In
    
    var In = function (column, values, negation) {
        this.column = column; 
        this.value = values;
        this.negation = negation;
    };

    In.prototype = new IFilter();
    In.prototype.constructor = In;

    In.prototype.getValues = function () { 
        return [ this.value ]; 
    };

    In.prototype.getSentence = function () {
        var self = this, filter = "(" + self.column; // Filtro
            
        filter += (self.negation ? " NOT" : "") + " IN (";
        
        softtion.forEach(self.value, (column, index) => {
            filter += (((index + 1) !== self.value.length) ? "?, " : "?)"); 
        });

        return filter + ")"; // Retornando filtro generado
    };
    
    // Clase Between

    var Between = function (column, since, until, negation) {
        this.column = column;
        this.since = since;
        this.until = until;
        this.negation = negation;
    };

    Between.prototype = new IFilter();
    Between.prototype.constructor = Between;

    Between.prototype.getValues = function () { 
        return [ this.since, this.until ]; 
    };

    Between.prototype.getSentence = function () {
        return "(" + this.column + (this.negation ? " NOT" : "") + " BETWEEN ? AND ?)";
    };
    
    // Clase IsNull
    
    var IsNull = function (column, negation) {
        this.column = column;
        this.negation = negation;
    };

    IsNull.prototype = new IFilter();
    IsNull.prototype.constructor = IsNull;

    IsNull.prototype.getValues = function () { 
        return []; 
    };
    
    IsNull.prototype.getSentence = function () {
        return "(" + this.column + " IS" + (this.negation ? " NOT" : "") + " NULL";
    };

    // Clase Filters

    var Filters = function () {
        this.filters = []; // Filtros de la agrupación
    };

    Filters.prototype = new IFilter();
    Filters.prototype.constructor = Filters;

    Filters.prototype.addFilter = function (filter, operator) {
        if (isFilter(filter)) {
            operator = defineOperatorLogic(operator);
            
            this.filters.push({ 
                filter : filter, operatorLogic : operator 
            });
        } // Agregando filtro para clausula
        
        return this; // Retornando interfaz fluida
    };
    
    Filters.prototype.getValues = function () {
        var values = []; // Valores

        this.filters.forEach((item) => {
            values = values.concat(item.filter.getValues());
        });
        
        return values; // Retornando lista de Valores
    };

    Filters.prototype.getSentence = function () {
        var filters = this.filters;
        
        if (filters.isEmpty()) {
            return null;
        } // No se han definido condiciones para clausula Where

        var sentence = "("; // Inicializando filtro
        
        if (filters.has(1)) {
            sentence += filters.first().filter.getSentence();
        } else {
            softtion.forEach(filters, (item, index) => {
                if (index !== 0) {
                    sentence += " " + item.operatorLogic + " ";
                } // No es el primero de la lista
                
                sentence += item.filter.getSentence();
            });
        }

        return sentence.trim() + ")"; // Retornando filtro completado
    };

    // Interfaz IClause

    var IClause = function () { };
    
    IClause.prototype.getSentence = function () { };
    
    IClause.prototype.getValues = function () { };

    // Clase Where
        
    var Where = function () { 
        this.filters = []; // Filtros de clausula
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

    Where.prototype.getValues = function () {
        var values = []; // Valores

        this.filters.forEach((item) => {
            values = values.concat(item.filter.getValues());
        });

        return values; // Retornando valores de la claúsula
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
            softtion.forEach(filters, (item, index) => {
                if (index !== 0) {
                    clause += " " + item.operatorLogic + " ";
                } // No es el primero de la lista
                
                clause += item.filter.getSentence();
            });
        } // Existen mas de un filtro en la clausula

        return clause.trim(); // Retornando clausula constituida
    };
    
    // Clase Limit
    
    var Limit = function (rows, offset) {
        this.rows = rows; this.offset = offset;
    };

    Limit.prototype = new IClause();
    Limit.prototype.constructor = Limit;
    
    Limit.prototype.getSentence = function () {
        var rows = this.rows,
            offset = this.offset;
        
        if (softtion.isUndefined(rows) && isNaN(rows)) { 
            return null;
        } // No se han definido columna GROUP BY

        var clause = "LIMIT " + rows; // Inicializando clausula
        
        if (!isNaN(offset)) {
            clause += " OFFSET " + offset;
        } // Ha definido correctamente un OFFSET

        return clause; // Retornando clausula constituida
    };
    
    // Clase GroupBy
    
    var GroupBy = function () {
        this.columns = []; // Columnas para agrupación
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
        
        softtion.forEach(columns, (column, index) => {
            var isNotLast = ((index + 1) !== columns.length);
            clause += column + ((isNotLast) ? ", " : ""); 
        });

        return clause; // Retornando clausula constituida
    };

    // Clase Having
        
    var Having = function () { 
        this.filters = []; // Filtros de la clausula
    };

    Having.prototype = new IClause();
    Having.prototype.constructor = Having;

    Having.prototype.addFilter = function (filter, operator) {
        if (isFilter(filter)) {
            operator = defineOperatorLogic(operator);
            
            this.filters.push({
                filter: filter, operatorLogic: operator
            });
        } // Agregando filtro para la clausula Having

        return this; // Retornando interfaz fluida
    };
    
    Having.prototype.isEmpty = function () { 
        return this.filters.isEmpty(); 
    };

    Having.prototype.getValues = function () {
        var values = []; // Valores

        this.filters.forEach((item) => {
            values = values.concat(item.filter.getValues());
        });

        return values; // Retornando valores de la claúsula
    };

    Having.prototype.getSentence = function () {
        var filters = this.filters; // Filtros de la clausula
        
        if (filters.isEmpty()) { 
            return null;
        } // No han definido filtros WHERE

        var clause = "HAVING "; // Inicializando clausula
        
        if (filters.has(1)) {
            clause += filters.first().filter.getSentence();
        } else {
            softtion.forEach(filters, (item, index) => {
                if (index !== 0) {
                    clause += " " + item.operatorLogic + " ";
                } // No es el primero de la lista
                
                clause += item.filter.getSentence();
            });
        } // Existen mas de un filtro en la clausula

        return clause.trim(); // Retornando clausula constituida
    };
    
    // Clase OrderBy
    
    var OrderBy = function () {
        this.columns = []; // Columnas de ordenamiento
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
        
        softtion.forEach(columns, (column, index) => {
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
        var $connection = (connection instanceof DB) ?
            connection.getConnection() : connection;
        
        this.connection = $connection; return this;
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
    
    ICommand.prototype.setJson = function (json) {
        if (softtion.isDefined(json)) {
            var columns = [], values = []; // Columnas y valores
            
            jQuery.each(json, (key, item) => {
                columns.push(key); values.push(item);
            });
            
            this.setColumns(columns); this.setValues(values);
        } // Se establecio correctamente un objeto
        
        return this; // Retornando interfaz fluida
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
    
    IWhere.prototype.where = function () {
        var operator, value; // Datos para condición
        
        if (arguments.length > 2) {
            operator = arguments[1]; value = arguments[2];
        } else {
            operator = "="; value = arguments[1];
        } // El operador de la condición es una igualdad
        
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.CONDITION,
            filterAttrs: {
                column: arguments[0], operator: operator, values: [value]
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    IWhere.prototype.orWhere = function () {
        var operator, value; // Datos para condición
        
        if (arguments.length > 2) {
            operator = arguments[1]; value = arguments[2];
        } else {
            operator = "="; value = arguments[1];
        } // El operador de la condición es una igualdad
        
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.CONDITION,
            filterAttrs: {
                column: arguments[0], operator: operator, values: [value]
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    // WHERE: IS NULL FILTER
    
    IWhere.prototype.whereIsNull = function (column) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.IS_NULL,
            filterAttrs: { column: column, negation: false }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    IWhere.prototype.whereIsNotNull = function (column) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.IS_NULL,
            filterAttrs: { column: column, negation: true }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    IWhere.prototype.orWhereIsNull = function (column) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.IS_NULL,
            filterAttrs: { column: column, negation: false }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    IWhere.prototype.orWhereIsNotNull = function (column) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.IS_NULL,
            filterAttrs: { column: column, negation: true }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    // WHERE: IN FILTER
    
    IWhere.prototype.whereIn = function (column, values) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.IN,
            filterAttrs: { 
                column: column, values: values, negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    IWhere.prototype.whereNotIn = function (column, values) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.IN,
            filterAttrs: { 
                column: column, values: values, negation: true 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    IWhere.prototype.orWhereIn = function (column, values) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.IN,
            filterAttrs: { 
                column: column, values: values, negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    IWhere.prototype.orWhereNotIn = function (column, values) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.IN,
            filterAttrs: { 
                column: column, values: values, negation: true
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    // WHERE: BETWEEN FILTER
    
    IWhere.prototype.whereBetween = function (column, values) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.BETWEEN,
            filterAttrs: { 
                column: column, values: values, negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    IWhere.prototype.whereNotBetween = function (column, values) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.BETWEEN,
            filterAttrs: { 
                column: column, values: values, negation: true 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    IWhere.prototype.orWhereBetween = function (column, values) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.BETWEEN,
            filterAttrs: { 
                column: column, values: values, negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    IWhere.prototype.orWhereNotBetween = function (column, values) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.BETWEEN,
            filterAttrs: { 
                column: column, values: values, negation: true
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    // WHERE: LIKE FILTER
    
    IWhere.prototype.whereLike = function (column, value) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.LIKE,
            filterAttrs: { 
                column: column, values: [value], negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    IWhere.prototype.whereNotLike = function (column, value) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.LIKE,
            filterAttrs: { 
                column: column, values: [value], negation: true 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    IWhere.prototype.orWhereLike = function (column, value) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.LIKE,
            filterAttrs: { 
                column: column, values: [value], negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    IWhere.prototype.orWhereNotLike = function (column, value) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.LIKE,
            filterAttrs: { 
                column: column, values: [value], negation: true
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    // WHERE: GLOB FILTER
    
    IWhere.prototype.whereGlob = function (column, value) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.GLOB,
            filterAttrs: { 
                column: column, values: [value], negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    IWhere.prototype.whereNotGlob = function (column, value) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.GLOB,
            filterAttrs: { 
                column: column, values: [value], negation: true 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    IWhere.prototype.orWhereGlob = function (column, value) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.GLOB,
            filterAttrs: { 
                column: column, values: [value], negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    IWhere.prototype.orWhereNotGlob = function (column, value) {
        defineFilterWhere({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.GLOB,
            filterAttrs: { 
                column: column, values: [value], negation: true
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };

    // Interfaz ISelect

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
    
    ISelect.prototype.groupBy = function (column) {
        this.groupByClause = getInstanceGroupBy(this.groupByClause); 
        this.groupByClause.addColumn(column); return this;
    };
    
    ISelect.prototype.orderBy = function (column, operator) {
        this.orderByClause = getInstanceOrderBy(this.orderByClause); 
        this.orderByClause.addColumn(column, operator); return this;
    };
    
    ISelect.prototype.limit = function (rows, offset) {
        this.limitClause = new Limit(rows, offset); return this;
    };
    
    function getInstanceHaving(having) {
        var verify = (
            softtion.isDefined(having) && having instanceof Having
        );

        return (verify) ? having : new Having(); // Retornando Having
    }
    
    function defineFilterHaving(attrs) {
        var command = attrs.command, // Instancia del comando
            operator = attrs.operatorLogic,
            filter = FilterFactory(
                attrs.filterName, attrs.filterAttrs
            );
        
        command.havingClause = getInstanceHaving(command.havingClause); 
        
        if (command.isGroupFilter) {
            command.filters.push({
                filter: filter, operatorLogic: operator
            });
        } else {
            command.havingClause.addFilter(filter, operator);
        }
    }
    
    // HAVING: CONDITION FILTER
    
    ISelect.prototype.having = function () {
        var operator, value; // Datos para condición
        
        if (arguments.length > 2) {
            operator = arguments[1]; value = arguments[2];
        } else {
            operator = "="; value = arguments[1];
        } // El operador de la condición es una igualdad
        
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.CONDITION,
            filterAttrs: {
                column: arguments[0], operator: operator, values: [value]
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    ISelect.prototype.orHaving = function () {
        var operator, value; // Datos para condición
        
        if (arguments.length > 2) {
            operator = arguments[1]; value = arguments[2];
        } else {
            operator = "="; value = arguments[1];
        } // El operador de la condición es una igualdad
        
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.CONDITION,
            filterAttrs: {
                column: arguments[0], operator: operator, values: [value]
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    // HAVING: IS NULL FILTER
    
    ISelect.prototype.havingIsNull = function (column) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.IS_NULL,
            filterAttrs: { column: column, negation: false }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    ISelect.prototype.havingIsNotNull = function (column) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.IS_NULL,
            filterAttrs: { column: column, negation: true }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    ISelect.prototype.orHavingIsNull = function (column) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.IS_NULL,
            filterAttrs: { column: column, negation: false }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    ISelect.prototype.orHavingIsNotNull = function (column) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.IS_NULL,
            filterAttrs: { column: column, negation: true }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    // HAVING: IN FILTER
    
    ISelect.prototype.havingIn = function (column, values) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.IN,
            filterAttrs: { 
                column: column, values: values, negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    ISelect.prototype.havingNotIn = function (column, values) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.IN,
            filterAttrs: { 
                column: column, values: values, negation: true 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    ISelect.prototype.orHavingIn = function (column, values) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.IN,
            filterAttrs: { 
                column: column, values: values, negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    ISelect.prototype.orHavingNotIn = function (column, values) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.IN,
            filterAttrs: { 
                column: column, values: values, negation: true
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    // HAVING: BETWEEN FILTER
    
    ISelect.prototype.havingBetween = function (column, values) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.BETWEEN,
            filterAttrs: { 
                column: column, values: values, negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    ISelect.prototype.havingNotBetween = function (column, values) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.BETWEEN,
            filterAttrs: { 
                column: column, values: values, negation: true 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    ISelect.prototype.orHavingBetween = function (column, values) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.BETWEEN,
            filterAttrs: { 
                column: column, values: values, negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    ISelect.prototype.orHavingNotBetween = function (column, values) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.BETWEEN,
            filterAttrs: { 
                column: column, values: values, negation: true
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    // HAVING: LIKE FILTER
    
    ISelect.prototype.havingLike = function (column, value) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.LIKE,
            filterAttrs: { 
                column: column, values: [value], negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    ISelect.prototype.havingNotLike = function (column, value) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.LIKE,
            filterAttrs: { 
                column: column, values: [value], negation: true 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    ISelect.prototype.orHavingLike = function (column, value) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.LIKE,
            filterAttrs: { 
                column: column, values: [value], negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    ISelect.prototype.orHavingNotLike = function (column, value) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.LIKE,
            filterAttrs: { 
                column: column, values: [value], negation: true
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    // HAVING: GLOB FILTER
    
    ISelect.prototype.havingGlob = function (column, value) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.GLOB,
            filterAttrs: { 
                column: column, values: [value], negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    ISelect.prototype.havingNotGlob = function (column, value) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.AND,
            filterName: FiltersName.GLOB,
            filterAttrs: { 
                column: column, values: [value], negation: true 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    ISelect.prototype.orHavingGlob = function (column, value) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.GLOB,
            filterAttrs: { 
                column: column, values: [value], negation: false 
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
    };
    
    ISelect.prototype.orHavingNotGlob = function (column, value) {
        defineFilterHaving({
            command: this,
            operatorLogic: OperatorsLogic.OR,
            filterName: FiltersName.GLOB,
            filterAttrs: { 
                column: column, values: [value], negation: true
            }
        }); // Agregando filtro
        
        return this; // Retornando interfaz fluida
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

        var sentence = "INSERT INTO " + table; // Iniciando

        if (!softtion.isArrayEmpty(columns)) {
            sentence += " ("; // Iniciando cargue columnas
    
            softtion.forEach(columns, (column, index) => {
                var isNotLast = ((index + 1) !== columns.length);
                sentence += column + ((isNotLast) ? ", " : ")"); 
            });
        } // Se establecieron los nombres de las columnas

        sentence += " VALUES ("; // Iniciando cargue de columnas
        
        softtion.forEach(values, (value, index) => {
            var isNotLast = ((index + 1) !== values.length);
            sentence += "?" + ((isNotLast) ? ", " : ")"); 
        });
        
        return sentence; // Retornando comando INSERT
    };

    Insert.prototype.execute = function () {
        var self = this; // Instancia Database
        
        return new Promise((resolve, reject) => {
            var connection = self.connection;
            
            if (softtion.isDefined(connection)) {
                var command = self.getCommand(); // Comando generado
                
                if (softtion.isUndefined(command)) {
                    resolve({ success: false,  message: ErrorSQL.PARAMETERS });
                } // No se definieron parametros de sentencia
                
                var values = self.values; // Valores

                connection.transaction((sqlTransaction) => {
                    sqlTransaction.executeSql(command, values, 
                        function () { 
                            resolve({ success: true });
                        },
                        function (sqlTransaction, sqlError) {
                            reject({ sqlError: sqlError });
                        }
                    );
                });
            } else {
                resolve({ success: false, message: ErrorSQL.CONNECTION });
            } // No hay instancia de la conexión definida
        });
    };

    // Clase InsertArray
    
    var InsertArray = function (connection) {
        this.setConnection(connection);
        
        this.result = []; this.values = undefined;
    };

    InsertArray.prototype = new ICommand();
    InsertArray.prototype.constructor = InsertArray;
    
    InsertArray.prototype.setJson = function () {
        return this; // Retornando interfaz fluida
    };
    
    function getParametersArray(table, object) {
        var sentence = "INSERT INTO " + table + " VALUES (",
            values = []; // Lista de valores
            
        softtion.forEach(object, (value, index) => {
            var isNotLast = ((index + 1) < object.length);
            sentence += "?" + ((isNotLast) ? ", " : ")"); 
            
            values.push(value); // Agregando valor en lista
        });
        
        return { sentence: sentence, values: values }; // Resultado
    }
    
    function getParametersJson(table, object) {
        var sentence = "INSERT INTO " + table, // Sentencia
                
            length = Object.keys(object).length, 
            column = "(", values = "(", 
            index = 0, datas = []; // Lista de valores
    
        jQuery.each(object, (key, value) => {
            var isNotLast = ((index + 1) < length); // Último
            
            column += key + ((isNotLast) ? ", " : ")"); 
            values += "?" + ((isNotLast) ? ", " : ")"); 
            
            index++; datas.push(value); // Agregando valor en lista
        });
        
        sentence += " " + column + " VALUES " + values;
        
        return { sentence: sentence, values: datas }; // Resultado
    }

    InsertArray.prototype.getCommand = function (object) {
        if (softtion.isUndefined(object)) {
            return null;
        } // Objeto a insertar es inválido
        
        var table = this.table; // Nombre de tabla
        
        if (softtion.isUndefined(table)) {
            return null;
        } // Comando contiene tabla definida

        if (softtion.isArray(object)) {
            return getParametersArray(table, object);
        } else {
            return getParametersJson(table, object);
        }
    };
    
    InsertArray.prototype.setValues = function (values) {
        if (!softtion.isArrayEmpty(values)) {
            this.values = values;
        } // Es un array, y contiene elementos
        
        return this; // Retornando interfaz fluida
    };
    
    function verifyEachValues(sqlTransaction, command, index, resolve) {
        index++; // Incrementando el index
        
        if (index === command.values.length) {
            resolve({ success: true, result: command.result });
        } else {
            registerItem(sqlTransaction, command, index, resolve);
        } // Se debe continuar con el proceso
    }

    function registerItem(sqlTransaction, command, index, resolve) {
        var object = command.values[index],
            result = command.getCommand(object);
    
        if (softtion.isUndefined(result)) {
            command.result.push({ 
                success: false, 
                data: object, 
                message: ErrorSQL.PARAMETERS 
            });
            
            verifyEachValues(sqlTransaction, command, index, resolve);
        } else {
            sqlTransaction.executeSql(
                result.sentence, result.values, () => { 
                    command.result.push({ 
                        success: true, data: object
                    });
                    
                    verifyEachValues(sqlTransaction, command, index, resolve);
                },
                (sqlTransaction, sqlError) => {
                    command.result.push({ 
                        success: false, data: object, sqlError: sqlError
                    });
                    
                    verifyEachValues(sqlTransaction, command, index, resolve);
                }
            );
        }
    }
    
    InsertArray.prototype.execute = function () {
        var self = this; // Instancia Database
        
        return new Promise((resolve) => {
            var connection = self.connection; // Conexión
            
            if (softtion.isDefined(connection)) {
                connection.transaction(
                    (sqlTransaction) => {
                        registerItem(
                            sqlTransaction, self, 0, resolve
                        );
                    });
            } else {
                resolve({ 
                    success: false, message: ErrorSQL.CONNECTION
                });
            } // No hay instancia de la conexión definida
        });
    };

    // Clase Update

    var Update = function (connection) { 
        this.setConnection(connection);
    };

    Update.prototype = new IWhere();
    Update.prototype.constructor = Update;

    Update.prototype.getCommand = function () {
        var table = this.table, columns = this.columns;
        
        if (softtion.isUndefined(table) || softtion.isArrayEmpty(columns)) {
            return null;
        } // Comando contiene atributos indefinidos

        var sentence = "UPDATE " + table + " SET "; // Inicio
    
        softtion.forEach(columns, (column, index) => {
            var isNotLast = ((index + 1) !== columns.length);
            sentence += (column + "=?") + ((isNotLast) ? ", " : ""); 
        });
        
        if (softtion.isDefined(this.whereClause)) { 
            sentence += " " + this.whereClause.getSentence();
        } // Cargando Clausula WHERE del comando

        return sentence; // Retornando comando UPDATE
    };

    Update.prototype.execute = function () {
        var self = this; // Instancia Database
        
        return new Promise((resolve, reject) => {
            var connection = self.connection;
            
            if (softtion.isDefined(connection)) {
                var command = self.getCommand(); // Comando
                
                if (softtion.isUndefined(command)) {
                    resolve({ success: false, message: ErrorSQL.PARAMETERS });
                } // No se definieron parametros de sentencia
                    
                var values = self.values, where = self.whereClause;

                if (softtion.isDefined(where)) {
                    values = values.concat(where.getValues());
                } // Agrengado valores de Clausula WHERE

                connection.transaction((sqlTransaction) => {
                    sqlTransaction.executeSql(command, values, 
                        (sqlTransaction, sqlResultSet) => { 
                            resolve({ 
                                success: true,
                                rowsAffected: sqlResultSet.rowsAffected
                            });
                        },
                        (sqlTransaction, sqlError) => {
                            reject({ sqlError: sqlError });
                        }
                    );
                });
            } else {
                resolve({ success: false, message: ErrorSQL.CONNECTION });
            } // No hay instancia de la conexión definida
        });
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
        
        return new Promise((resolve, reject) => {
            var connection = self.connection;
            
            if (softtion.isDefined(connection)) {
                var command = self.getCommand(); // Comando
                
                if (softtion.isUndefined(command)) {
                    resolve({ success: false, message: ErrorSQL.PARAMETERS });
                } // No se definieron parametros de sentencia
                
                var where = self.whereClause, values;

                if (softtion.isDefined(where)) {
                    values = where.getValues();
                } // Agrengado valores de Clausula WHERE

                connection.transaction((sqlTransaction) => {
                    sqlTransaction.executeSql(command, values, 
                        (sqlTransaction, sqlResultSet) => { 
                            resolve({ 
                                success: true,
                                rowsAffected: sqlResultSet.rowsAffected
                            });
                        },
                        (sqlTransaction, sqlError) => {
                            reject({ sqlError: sqlError });
                        }
                    );
                });
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
        var tables = this.tables, distinct = this.distinct,
            columns = this.columns;
        
        if (softtion.isArrayEmpty(tables)) {
            return null;
        } // El comando no tiene tablas definidas

        var sentence = "SELECT" + ((distinct) ? " DISTINCT " : " ");
        
        if (softtion.isArrayEmpty(columns)) {
            sentence += "*"; // No definío columnas
        } else {
            softtion.forEach(columns, (column, index) => {
                var isNotLast = ((index + 1) !== columns.length);
                sentence += column + ((isNotLast) ? ", " : ")"); 
            });
        } // Se establecen las columnas definidas en el Comando

        sentence += " FROM "; // Cargando tabla de consulta
        
        softtion.forEach(tables, (table, index) => {
            var isNotLast = ((index + 1) !== tables.length);
            sentence += table + ((isNotLast) ? ", " : ""); 
        });

        if (softtion.isDefined(this.whereClause)) {
            sentence += " " + this.whereClause.getSentence();
        } // Cargando Clausula WHERE del comando

        if (softtion.isDefined(this.limitClause)) {
            sentence += " " + this.limitClause.getSentence();
        } // Cargando Clausula LIMIT del comando

        if (softtion.isDefined(this.groupByClause)) {
            sentence += " " + this.groupByClause.getSentence();
        } // Cargando Clausula GROUP BY del comando

        if (softtion.isDefined(this.havingClause)) {
            sentence += " " + this.havingClause.getSentence();
        } // Cargando Clausula HAVING del comando

        if (softtion.isDefined(this.orderByClause)) {
            sentence += " " + this.orderByClause.getSentence();
        } // Cargando Clausula ORDER BY del comando

        return sentence; // Retornando sentencia SELECT
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
        
        return new Promise((resolve, reject) => {
            var connection = self.connection;
            
            if (softtion.isDefined(connection)) {
                var command = self.getCommand(); // Comando
                
                if (softtion.isUndefined(command)) {
                    resolve({ success: false, message: ErrorSQL.PARAMETERS });
                } // No se definieron parametros de sentencia
                
                var where = self.whereClause, values;

                if (softtion.isDefined(where)) {
                    values = where.getValues();
                } // Agrengado valores de Clausula WHERE

                connection.transaction((sqlTransaction) => {
                    sqlTransaction.executeSql(command, values, 
                        (sqlTransaction, sqlResultSet) => { 
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

                        (sqlTransaction, sqlError) => {
                            reject({ sqlError: sqlError });
                        }
                    );
                });
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
        var $connection = (connection instanceof DB) ?
            connection.getConnection() : connection;
            
        this.connection = $connection; return this;
    };
    
    Table.prototype.setNotExists = function (notExists) {
        this.notExists = notExists; return this;
    };
    
    Table.prototype.getName = function () {
        return this.name;
    };
    
    Table.prototype.addColumn = function (attrs) {
        var name = attrs.name, type = attrs.type;
        
        if (softtion.isString(name) && softtion.isString(type)) {
            if (!this.columnsName.hasItem(name)) {
                // Agregando columna de tabla
                this.columns.push(
                    new ColumnTable().
                        setName(name).setType(type).
                        setPrimaryKey(attrs.primaryKey).
                        setAutoIncrement(attrs.autoIncrement).
                        setNotNull(attrs.notNull)
                );
        
                this.columnsName.push(name);
            } // Columna no ha sido registrada
        } // Se establecieron parametros necesarios correctamente
        
        return this; // Retornando interfaz fluida
    };
    
    Table.prototype.addColumns = function (columns) {
        if (!softtion.isArrayEmpty(columns)) {
            var self = this; // Instancia de Table
            
            softtion.forEach(columns, (column) => {
                self.addColumn(column);
            });
        } // Se estableció una lista de columnas
        
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
        
        softtion.forEach(columns, (column, index) => {
            command += column.getSentence() +
                (((index + 1) !== columns.length) ? ", " : ""); 
        });

        return command + ");"; // Retornando comando final
    };
    
    Table.prototype.create = function () {
        var self = this; // Instancia de la Tabla
        
        return new Promise((resolve, reject) => {
            var connection = self.connection;
            
            if (softtion.isDefined(connection)) {
                var command = self.getSentence();
                
                if (softtion.isUndefined(command)) {
                    resolve({ success: false, message: ErrorSQL.PARAMETERS });
                } // Parametros establecidos son insuficientes
                
                connection.transaction((sqlTransaction) => {
                    sqlTransaction.executeSql(command, [], 
                        () => { 
                            resolve({ success: true });
                        },
                        (sqlTransaction, sqlError) => {
                            reject({ sqlError: sqlError });
                        }
                    );
                });
            } else {
                resolve({ success: false, message: ErrorSQL.CONNECTION });
            } // No hay instancia de la conexión
        });
    };

    Table.prototype.drop = function (table) {
        var self = this; // Instancia Database
        
        return new Promise((resolve, reject) => {
            var connection = self.connection;
            
            if (softtion.isDefined(connection)) {
                var command = "DROP TABLE " + table; // Comando DROP
                
                connection.transaction((sqlTransaction) => {
                    sqlTransaction.executeSql(command, [], 
                        () => { 
                            resolve({ success: true });
                        },
                        (sqlTransaction, sqlError) => {
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
    
    var DB = function (options) {
        this.connection = undefined; // Conexión de sqLite
        
        if ($sqLite.isSupported()) {
            var defaults = {
                descripcion: "Softtion",
                version: "1.0.0", 
                size: 2 * 1024 * 1024
            };

            var $options = jQuery.extend({}, defaults, options);
            
            this.connection = window.openDatabase(
                $options.name, $options.version,
                $options.description, $options.size           
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