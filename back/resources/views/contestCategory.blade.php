@extends('master')

@section('content')
<div class="content">
    <div class="row">
        <div class="col-sm-4 col-3">
            <h4 class="page-title">Contest Category</h4>
        </div>
        <div class="col-sm-8 col-9 text-right m-b-20">
            <a href="{{ URL::to('contestCategory/create') }}" class="btn btn btn-primary btn-rounded float-right"><i class="fa fa-plus"></i> Add Contest Category</a>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="table-responsive">
                <table class="table table-border table-striped custom-table mb-0">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Contest Name</th>
                            <th>Contest Description</th>
                            <th>Order</th>
                            <th>Status</th>
                            <th class="text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($contestCategories as $key=>$value)
                            <tr>
                                <td>{{ ($key+1) }}</td>
                                <td>{{ $value->name }}</td>
                                <td>{{ $value->description }}</td>
                                <td>{{ $value->order }}</td>
                                <td><a href="{{ route('contests.status', $value->id) }}" class="btn {{ $value->is_block == 0 ? 'btn-success' : 'btn-danger' }} text-white">{{ $value->is_block == 1 ? 'In-active' : 'Active' }}</a></td>
                                <td class="text-right">
                                    <div class="dropdown dropdown-action">
                                        <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a class="dropdown-item" href="{{ URL::to('contestCategory/'.$value->id.'/edit') }}"><i class="fa fa-pencil m-r-5"></i> Edit</a>
                                            @if ($value->is_block == 1)
                                            <a class="dropdown-item" href="#" onclick="deleteItem('contestCategory/{{ $value->id }}')" attr-text='Are you sure want to delete this Contest Category?' ><i class="fa fa-trash-o m-r-5"></i> Delete</a>
                                            @endif
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
