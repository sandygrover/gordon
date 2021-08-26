<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\ContestResource;
use App\Http\Resources\StockDetailResource;
use App\Models\Contest;
use App\Services\StockService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index() {
        $response = [];
        $response['earning'] = '$2,020.04';
        $response['stock'] = '$21.89';
        $response['forex_rate'] = '7.8478';
        return response()->json([
            'status' => true,
            'message' => 'Dashboard data retrieve successfully',
            'data' => [$response]
        ]);
    }

    public function companyDetail()  {
        $response = [];
        $response['company_name'] = 'FDCS';
        $response['address'] = '1100 S. Coast';
        $response['city'] = 'Laguna Beach';
        $response['country'] = 'US';
        $response['zipcode'] = '92651';
        $response['phone'] = '(949) 555-1212';
        $response['financial_information'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare ligula id arcu condimentum, nec congue nisi scelerisque.';
        $response['history_and_past_performance'] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare ligula id arcu condimentum, nec congue nisi scelerisque.';
        return response()->json([
            'status' => true,
            'message' => 'Company data retrieve successfully',
            'data' => [$response]
        ]);
    }

    public function userWallet() {
        $response = array(
            array(
                'id' => '1',
                'comment' => 'Payment to xyz stock',
                'credit' => '100',
                'debit' => '0',
                'date' => 'Feb 6, 2021'
            ),
            array(
                'id' => '2',
                'comment' => 'Credit from xyz ltd',
                'credit' => '150',
                'debit' => '0',
                'date' => 'Feb 6, 2021'
            ),
            array(
                'id' => '3',
                'comment' => 'Transfer from John Doe',
                'credit' => '0',
                'debit' => '300',
                'date' => 'Feb 6, 2021'
            )
        );
        return response()->json([
            'status' => true,
            'message' => 'User Wallet data retrieve successfully',
            'data' => $response
        ]);
    }

    public function userGraph() {
        $response = array(
            array(
                0.0,
                0.0
            ),
            array(
                1.0,
                0.4569743965435782
            ),
            array(
                2.0,
                1.6256820631926587
            ),
            array(
                3.0,
                1.7664740750426855
            ),
            array(
                4.0,
                3.8424503730766397
            ),
            array(
                5.0,
                0.013834755315761949
            ),
            array(
                6.0,
                5.3059733641321305
            ),
            array(
                7.0,
                3.785959089508858
            )
        );
        return response()->json([
            'status' => true,
            'message' => 'User Graph data retrieve successfully',
            'data' => $response
        ]);
    }

    public function contestList() {
        return response()->json([
            'status' => true,
            'message' => 'Contest List Get Successfully',
            'data' => ContestResource::collection(Contest::with('contestCategory')->get())
        ]);
    }

    public function stockList(Request $request) {
        $type = $request->type ?? '';
        if($type === 'forex') {
            return StockService::getForex();
        }
        return StockService::getStock();
    }

    public function stockDetail(Request $request) {
        $type = $request->type;
        $id = $request->id;
        return StockService::getStockDetail($id);
    }
}
