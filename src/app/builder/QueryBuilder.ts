import { FilterQuery, Query } from "mongoose"

class QueryBuilder<I> {
  constructor(
    public queryModel: Query<I[], I>,
    public query: Record<string, unknown>
  ) {}

  search(searchAbleFields: string[]) {
    const search = this?.query?.search || ""

    if (search) {
      this.queryModel = this.queryModel.find({
        $or: searchAbleFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: "i" },
            } as FilterQuery<I>)
        ),
      })
    }

    return this
  }

  filter() {
    let queryObj = { ...this.query }

    const excludeFields = ["search", "sortOrder", "limit", "page", "sortBy"]
    excludeFields.forEach((element) => delete queryObj[element])

    if (queryObj.filter) {
      this.queryModel = this.queryModel.find({
        author: queryObj.filter,
      } as FilterQuery<I>)
      delete queryObj.filter
    }

    this.queryModel = this.queryModel.find(queryObj as FilterQuery<I>)

    return this
  }

  sort() {
    let sort = this?.query?.sortOrder as string

    if (sort && sort === "asc") {
      sort = "createdAt"
    } else if (sort && sort === "desc") {
      sort = "-createdAt"
    }

    this.queryModel = this.queryModel.sort(sort as string)
    return this
  }

  pagination() {
    const page = Number(this?.query?.page) || 1
    const limit = Number(this?.query?.limit) || 2
    const skip = (page - 1) * limit

    this.queryModel = this.queryModel.skip(skip).limit(limit)

    return this
  }

  fields() {
    const fields =
      (this?.query?.sortBy as string)?.split(",")?.join(" ") || "-__v"
    this.queryModel = this.queryModel.select(fields)
    return this
  }
}

export default QueryBuilder
