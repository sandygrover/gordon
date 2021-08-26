<?php

namespace App\Repositories;

use App\Models\ContestCategory;

/**
 * Class ContestCategoryRepository.
 *
 * @version August 11, 2020, 4:02 pm CDT
 */
class ContestCategoryRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'description'
    ];

    /**
     * Return searchable fields.
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model.
     **/
    public function model()
    {
        return ContestCategory::class;
    }
}
