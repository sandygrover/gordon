@extends('master')

@section('content')
    <div class="content">
        <div class="row">
            <div class="col-sm-4 col-3">
                <h4 class="page-title">Contest</h4>
            </div>
            <div class="col-sm-8 col-9 text-right m-b-20">
                <a href="{{ URL::to('contests/create') }}" class="btn btn btn-primary btn-rounded float-right"><i class="fa fa-plus"></i> Add Contest</a>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="table-responsive">
                    <table class="table table-border table-striped custom-table mb-0">
                        <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Contest name</th>
                            <th>Total winning amount</th>
                            <th>Contest size</th>
                            <th>Entry fees</th>
                            <th class="text-right">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach ($contests as $key=>$value)
                            <tr>
                                <td>{{ ($key+1) }}</td>
                                <td>{{ $value->contest_name }}</td>
                                <td>{{ $value->total_winning_amount }}</td>
                                <td>{{ $value->contest_size }}</td>
                                <td>{{ $value->entry_fees }}</td>
                                <td class="text-right">
                                    <div class="dropdown dropdown-action">
                                        <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a class="dropdown-item" href="{{ URL::to('contests/'.$value->id.'/edit') }}"><i class="fa fa-pencil m-r-5"></i> Edit</a>
                                            <a class="dropdown-item" href="#" onclick="deleteItem('contests/{{ $value->id }}')" attr-text='Are you sure want to delete this Contest?' ><i class="fa fa-trash-o m-r-5"></i> Delete</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
