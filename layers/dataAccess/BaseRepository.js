class BaseRepository {
  constructor(modelType) {
    this._modelType = modelType;
  }

  async count(filter) {
    if (filter) {
      return this._modelType.countDocuments(filter);
    }
    return this._modelType.estimatedDocumentCount();
  }

  async findAggregate(params) {
    return this.findAggregateTemplate(params);
  }

  async countDocuments(filter) {
    return this._modelType.countDocuments(filter);
  }

  async estimatedDocumentCount(filter) {
    return this._modelType.estimatedDocumentCount(filter);
  }

  async find(filter, projection, options) {
    return (await this._modelType.find(filter, projection, options)).map(
      this._toPlainObject
    );
  }

  async findOne(filter, projection, options = {}) {
    const result = await this.find(filter, projection, {
      ...options,
      limit: 1,
    });
    return result[0];
  }

  async findById(_id, projection, options) {
    return this.findOne({ _id }, projection, options);
  }

  async create(document) {
    if (Array.isArray(document)) {
      throw 'Utilisez plutot create many ';
    }
    const documentToInsert = { ...document };
    return this._toPlainObject(await this._modelType.create(documentToInsert));
  }

  async insertOne(document) {
    if (Array.isArray(document)) {
      throw 'Utilisez plutot create many ';
    }
    const documentToInsert = { ...document };

    return this._toPlainObject(await this._modelType.create(documentToInsert));
  }

  async insertMany(documents) {
    return this._modelType.insertMany(documents);
  }

  async createMany(documents) {
    if (!Array.isArray(document)) {
      throw 'Utilisez plutot create ';
    }

    const createDocuments = await this._modelType.insertMany(documents);
    return createDocuments.map(this._toPlainObject);
  }

  async update(filter, updateField, options = {}) {
    if (options.multi != true) {
      return this._modelType.updateOne(filter, updateField);
    }
    return this._modelType.updateMany(filter, updateField);
  }

  async remove(filter, options) {
    return this._modelType.remove(filter, options);
  }

  async deleteOne(filter) {
    return this._modelType.deleteOne(filter);
  }

  async deleteMany(filter) {
    return this._modelType.deleteMany(filter);
  }

  async aggregate(aggregations) {
    return this._modelType.aggregate(aggregations);
  }

  async distinct(query, field) {
    return this._modelType.distinct(field, query);
  }

  _toPlainObject(document) {
    if (document) {
      return document.toObject();
    }
    return null;
  }
}

module.exports = BaseRepository;